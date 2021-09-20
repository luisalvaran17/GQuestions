import os
from flask import Flask, jsonify, request
from question_generator import QuestionGenerator
from text_generator import TextGenerator
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

model_path = "./model"

@app.route('/api/generacion/question-generator', methods=['POST'])
def get_questions_answers():
    article = request.form['text']
    num_questions_request = request.form['num_questions']
    answer_style_request = request.form['answer_style']

    qg = QuestionGenerator()
    qa_list = qg.generate(
        str(article),
        num_questions=int(num_questions_request),
        answer_style=str(answer_style_request)
    )
    response = jsonify(qa_list)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/api/generacion/text-generator', methods=['POST'])
def get_text():
    sentence = request.form['sentence']
    max_length = request.form['max_length']

    tg = TextGenerator()
    text_generated = tg.generate_text(str(sentence), int(max_length))

    response = jsonify(text_generated)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == '__main__':
    # This is used when running locally only. When deploying to Google Cloud
    # Run, a webserver process such as Gunicorn will serve the app.
    app.run(debug=False, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))