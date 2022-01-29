from flask import Flask, request, jsonify
import traceback
import logging
from objectDetect import ObjectDetector
app = Flask(__name__)
det = ObjectDetector()

@app.route("/objectDetect",methods = ['POST'])
def objectDetect():
    try:
        file = request.files['image']
        print("File uploaded")
        expected = request.form['expected']
        ret = det.runDetect(file)
        if ret==expected:
            return jsonify({'msg': 'success', 'result': True})
        else:
            return jsonify({'msg': 'success', 'result': False})
    except Exception as e:
        logging.error(traceback.format_exc())
        return jsonify({'msg': '500 error'})


if __name__ == "__main__":
    app.run(debug=True)