from flask import Flask, request, jsonify
from objectDetect import ObjectDetector
app = Flask(__name__)
det = ObjectDetector()

@app.route("/objectDetect",methods = ['POST'])
def objectDetect():
    try:
        file = request.files['image']
        expected = request.args['expected']
        ret = det.runDetect(file)
        if ret==expected:
            return jsonify({'msg': 'success', 'result': True})
        else:
            return jsonify({'msg': 'success', 'result': False})
    except:
        return jsonify({'msg': '500 error'})


if __name__ == "__main__":
    app.run(debug=True)