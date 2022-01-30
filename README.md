# TAMUHACK 2022

Windows venv setup (in command prompt):

python -m venv ./venv 

venv\Scripts\activate.bat





# backend documentation
To install dependencies for zero shot:
pip install torchvision ftfy regex tqdm
pip install git+https://github.com/openai/CLIP.git

To run the server: flask run

/objectDetect
post request: 
please send {'image': image, 'expected': (string) expected class of object (is it ["smoke detector", "lock", "fire extinguisher"])}

if the image matches expected, returns json {'msg': 'success', 'result': True}, else {'msg': 'success', 'result': False}

To install dependencies for InvoiceNet, follow this link: https://github.com/naiveHobo/InvoiceNet

/invoiceDetect
post request: 
please send {'image': image}

returns json {'msg': 'success', 'result': {address: string, date: string, total: string, vendor_name: string}}