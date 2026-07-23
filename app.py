import os
import re
from flask import Flask, render_template, request, jsonify, flash, redirect, url_for
from config import config

# Initialize Flask application
env = os.environ.get('FLASK_ENV', 'development')
app = Flask(__name__)
app.config.from_object(config.get(env, config['default']))


# --------------------------------------------------------------------------
# Rule-Based Intelligent Knowledge Engine for Sparsh Assist Chatbot
# --------------------------------------------------------------------------
CHATBOT_KNOWLEDGE_BASE = [
    {
        "keywords": ["hello", "hi", "hey", "greetings", "namaste", "start"],
        "response": "Hello! Welcome to Sparsh Setu. I am Sparsh Assist, your virtual guide. How can I assist you today regarding our digital literacy initiatives?"
    },
    {
        "keywords": ["about", "sparsh setu", "who are you", "what is sparsh setu", "organization", "ngo"],
        "response": "Sparsh Setu is a non-governmental initiative dedicated to empowering underprivileged school children through hands-on computer education, digital literacy, and technology awareness campaigns."
    },
    {
        "keywords": ["internship", "project", "college", "college internship"],
        "response": "This project represents an impactful college internship drive where our team visited two schools, taught computer basics, distributed awareness posters, conducted interactive workshops, and deployed this digital platform!"
    },
    {
        "keywords": ["school", "schools", "visited", "location", "school visit"],
        "response": "During our internship campaign, we conducted intensive training sessions across two partner schools, reaching over 450+ students with zero prior computer experience."
    },
    {
        "keywords": ["teach", "taught", "curriculum", "subject", "computer", "basics"],
        "response": "We taught foundational topics including introduction to hardware & software, typing skills, operating basic apps, safe internet browsing, MS Office tools, and digital safety principles."
    },
    {
        "keywords": ["poster", "posters", "campaign", "awareness poster"],
        "response": "Our team custom-designed visual awareness posters covering cyber safety, benefits of computer education, and basic keyboard shortcuts, which were framed and installed in school computer labs."
    },
    {
        "keywords": ["volunteer", "join", "participate", "contribute", "support"],
        "response": "You can join us as a volunteer mentor or student facilitator! Please head over to our 'Volunteer' page and fill out the application form to get involved."
    },
    {
        "keywords": ["contact", "email", "phone", "address", "reach", "office"],
        "response": f"You can reach us at {app.config['NGO_EMAIL']} or call us at {app.config['NGO_PHONE']}. Our main office is located at {app.config['NGO_ADDRESS']}."
    },
    {
        "keywords": ["activity", "activities", "workshop", "event"],
        "response": "Our primary activities include Computer Awareness Workshops, Hands-on Lab Sessions, Digital Safety Campaigns, Poster Exhibitions, and Mentorship Programs."
    },
    {
        "keywords": ["impact", "student", "number", "stats", "statistics"],
        "response": "To date, we have impacted 450+ students, conducted 20+ interactive lab hours, distributed 50+ learning kits, and engaged 15+ dedicated student volunteers."
    },
    {
        "keywords": ["thank", "thanks", "bye", "goodbye"],
        "response": "You're very welcome! Thank you for supporting Sparsh Setu. Together, we bridge the digital divide!"
    }
]

DEFAULT_BOT_RESPONSE = "Thank you for asking! While I don't have an exact answer for that specific phrasing, Sparsh Setu is focused on bringing computer literacy to school children through hands-on workshops, poster campaigns, and volunteer mentorship. How else can I help?"


def query_chatbot_engine(user_message):
    """Processes user message and finds matching keyword responses."""
    clean_msg = re.sub(r'[^a-zA-Z0-9\s]', '', user_message.lower())
    words = clean_msg.split()
    
    # Check for direct keyword matches
    for rule in CHATBOT_KNOWLEDGE_BASE:
        for kw in rule["keywords"]:
            if kw in clean_msg or any(word == kw for word in words):
                return rule["response"]
                
    return DEFAULT_BOT_RESPONSE


# --------------------------------------------------------------------------
# Flask Application Routes
# --------------------------------------------------------------------------

@app.context_processor
def inject_global_variables():
    """Injects configuration variables into all Jinja2 templates."""
    return dict(
        app_name=app.config['APP_NAME'],
        tagline=app.config['TAGLINE'],
        bot_name=app.config['BOT_NAME'],
        ngo_email=app.config['NGO_EMAIL'],
        ngo_phone=app.config['NGO_PHONE'],
        ngo_address=app.config['NGO_ADDRESS']
    )


@app.route('/')
def home():
    """Home Page Handler."""
    return render_template('index.html', page_title="Home")


@app.route('/about')
def about():
    """About Page Handler."""
    return render_template('about.html', page_title="About Us")


@app.route('/activities')
def activities():
    """Activities Page Handler."""
    return render_template('activities.html', page_title="Our Activities")


@app.route('/gallery')
def gallery():
    """Gallery Page Handler."""
    return render_template('gallery.html', page_title="Media Gallery")


@app.route('/volunteer', methods=['GET', 'POST'])
def volunteer():
    """Volunteer Page Handler with Form Handling."""
    if request.method == 'POST':
        name = request.form.get('name', '').strip()
        email = request.form.get('email', '').strip()
        phone = request.form.get('phone', '').strip()
        
        if not name or not email or not phone:
            flash('Please fill out all required fields.', 'danger')
            return redirect(url_for('volunteer'))
            
        flash(f'Thank you, {name}! Your volunteer application has been submitted successfully. Our team will contact you soon.', 'success')
        return redirect(url_for('volunteer'))
        
    return render_template('volunteer.html', page_title="Become a Volunteer")


@app.route('/contact', methods=['GET', 'POST'])
def contact():
    """Contact Page Handler with Form Handling."""
    if request.method == 'POST':
        name = request.form.get('name', '').strip()
        email = request.form.get('email', '').strip()
        message = request.form.get('message', '').strip()
        
        if not name or not email or not message:
            flash('Please complete all required fields.', 'danger')
            return redirect(url_for('contact'))
            
        flash(f'Thank you, {name}! Your message has been received. We will respond to {email} shortly.', 'success')
        return redirect(url_for('contact'))
        
    return render_template('contact.html', page_title="Contact Us")


@app.route('/chatbot')
def chatbot_page():
    """Standalone AI Chatbot Interface Page."""
    return render_template('chatbot.html', page_title="Sparsh Assist AI")


@app.route('/api/chat', methods=['POST'])
def api_chat():
    """AJAX API Endpoint for Chatbot interactions."""
    data = request.get_json() or {}
    user_message = data.get('message', '').strip()
    
    if not user_message:
        return jsonify({
            'status': 'error',
            'response': 'Please enter a valid message.'
        }), 400
        
    response_text = query_chatbot_engine(user_message)
    return jsonify({
        'status': 'success',
        'response': response_text
    })


# --------------------------------------------------------------------------
# Error Handlers
# --------------------------------------------------------------------------

@app.errorhandler(404)
def page_not_found(e):
    """Custom 404 Error Page Handler."""
    return render_template('404.html', page_title="404 Page Not Found"), 404


@app.errorhandler(500)
def internal_server_error(e):
    """Custom 500 Error Page Handler."""
    return render_template('404.html', page_title="Server Error"), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)