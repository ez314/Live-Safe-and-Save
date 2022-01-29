# TAMUHACK 2022

Windows venv setup (in command prompt):

python -m venv ./venv 

venv\Scripts\activate.bat





# backend documentation

/objectDetect
post request: 
please send {'image': image, 'expected': (string) expected class of object (is it ["smoke detector", "lock", "fire extinguisher"])}

if the image matches expected, returns json {'msg': 'success', 'result': True}, else {'msg': 'success', 'result': False}
