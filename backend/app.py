from flask import Flask, request, jsonify
import traceback
import logging
from objectDetect import ObjectDetector
from PIL import Image
from invoiceDetect import predict
from flask import Flask, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, support_credentials=True)
det = ObjectDetector()

@app.route("/objectDetect",methods = ['POST'])
@cross_origin(supports_credentials=True)
def objectDetect():
    try:
        file = request.files['image']
        print("File uploaded")
        expected = request.form['expected']
        ret = det.runDetect(file)
        if ret==expected:
            return jsonify({'msg': 'success', 'result': True, 'mlres':ret})
        else:
            return jsonify({'msg': 'success', 'result': False, 'mlres':ret})
    except Exception as e:
        logging.error(traceback.format_exc())
        return jsonify({'msg': '500 error'})

@app.route("/invoiceDetect",methods = ['POST'])
@cross_origin(supports_credentials=True)
def invoiceDetect():
    try:
        file = request.files['image']
        print(str(file.content_type)=="application/pdf")
        if str(file.content_type)=="application/pdf":
            file.save("internal_storage/uploaded.pdf")
            ret = predict('internal_storage/uploaded.pdf')
            return jsonify({'msg': 'success', 'result': ret})
        image1 = Image.open(file)
        im1 = image1.convert('RGB')
        im1.save('internal_storage/uploaded.pdf')
        print("File uploaded")
        ret = predict('internal_storage/uploaded.pdf')
        return jsonify({'msg': 'success', 'result': ret})
    except Exception as e:
        logging.error(traceback.format_exc())
        return jsonify({'msg': '500 error'})

if __name__ == "__main__":
    app.run(debug=True)