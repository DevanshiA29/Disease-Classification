import streamlit as st
import google.generativeai as genai
import re
from api_key import api_key

# ────────────────────────────  CONFIG  ──────────────────────────── #
genai.configure(api_key=api_key)

generation_config = {
    "temperature": 0.4,
    "top_p": 1,
    "top_k": 32,
    "max_output_tokens": 4096,
}

model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config,
)

# ───────────────────────  PROMPT TEMPLATES  ─────────────────────── #
PROMPTS = {
    "analysis": """
You are a medical image analysis assistant. Carefully study the image and the user's note, then:
• Identify visible abnormalities.  
• Explain what they might indicate.  
• Suggest tests / precautions / possible treatments.  
• End with a short disclaimer: "This is not a medical diagnosis; please consult a doctor."  
Respond professionally, clearly, and concisely.
User note: "{user_note}"
""",
    "severity": """
You are a triage assistant. Analyse the image (and the user's note if provided) and output ONLY a line in the exact format:
Severity: X/10
where X is an integer 1–10 (10 = most severe).  
No extra text.
User note: "{user_note}"
""",
    "local": """
You are a healthcare navigator. Based on the image and user's note, suggest the most relevant specialist types
(e.g., dermatologist, orthopaedic surgeon).  
Provide 2‑3 next‑step actions (e.g., book appointment, get test).  
Keep it under 120 words.  
User note: "{user_note}"
""",
    "empathy": """
Speak to a patient who feels nervous describing their symptoms.  
Reassure them in warm, friendly language.  
Suggest 3–4 simple questions they can answer about the issue (onset, pain level, changes, triggers).  
Encourage honesty and remind them there's no judgement.  
Do NOT analyse the image.  
User note: "{user_note}"
""",
}

# ────────────────────────────  UI  ──────────────────────────────── #
st.set_page_config(page_title="Visuanary", page_icon=":robot:")
st.title("Visuanary 🤖")
st.subheader("🩺 Medical Image Analyzer")

uploaded_file = st.file_uploader(
    "📤 Upload a medical image (JPG, PNG, JPEG)", type=["jpg", "jpeg", "png"]
)

st.markdown(
    "💡 *Not sure how to describe your issue? Just tell me what you're feeling in your own words — even simple things help!*"
)
user_note = st.text_area(
    "Describe what you're feeling (optional):",
    placeholder="e.g., This rash appeared yesterday and it's itchy.",
)

option = st.radio(
    "Select what you’d like the AI to produce:",
    [
        "🔬 AI Medical Analysis",
        "📉 Severity Score",
        "🧑‍⚕️ Local Recommendations",
        "💬 Empathetic Guidance",
    ],
)

# Gradient style for radio buttons
st.markdown(
    """
<style>
div[data-baseweb="radio"] > div {flex-direction: column; gap: 0.5rem;}
label[data-testid="stRadioOption"] {
  background: linear-gradient(90deg,#6DD5FA,#2980B9);
  color:#fff; padding:10px 15px; border-radius:8px;
  font-weight:bold; cursor:pointer;
}
label[data-testid="stRadioOption"]:hover {opacity:0.9;}
</style>
""",
    unsafe_allow_html=True,
)

generate_btn = st.button("🚀 Generate selected output")

# ─────────────────────────  GENERATE  ───────────────────────────── #
if generate_btn:
    if uploaded_file is None and option != "💬 Empathetic Guidance":
        st.warning("Please upload an image first.")
        st.stop()

    # Build image part if needed
    image_parts = (
        [
            {
                "mime_type": "image/jpeg",
                "data": uploaded_file.getvalue(),
            }
        ]
        if uploaded_file is not None
        else []
    )

    # Pick prompt
    key = {
        "🔬 AI Medical Analysis": "analysis",
        "📉 Severity Score": "severity",
        "🧑‍⚕️ Local Recommendations": "local",
        "💬 Empathetic Guidance": "empathy",
    }[option]

    prompt_text = PROMPTS[key].format(user_note=user_note.strip() or "No additional note.")

    prompt_parts = image_parts + [prompt_text]

    with st.spinner("Thinking..."):
        try:
            response = model.generate_content(prompt_parts)
        except Exception as e:
            st.error(f"Error: {e}")
            st.stop()

    # ───────────  DISPLAY RESULTS  ─────────── #
    if key == "severity":
        match = re.search(r"(\d{1,2})", response.text)
        if match:
            sev = int(match.group(1))
            st.subheader(f"📉 Severity Score: {sev}/10")
            st.progress(min(sev, 10) / 10)
        else:
            st.info("AI did not return a numeric severity score.")
    else:
        headers = {
            "analysis": "🔬 AI Medical Analysis",
            "local": "🧑‍⚕️ Local Recommendations",
            "empathy": "💬 Empathetic Guidance",
        }
        st.subheader(headers.get(key, "Result"))
        st.write(response.text)
