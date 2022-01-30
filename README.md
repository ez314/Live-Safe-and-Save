# Live Safe and Save

[Devpost](https://devpost.com/software/live-safe-and-save)

## Inspiration

Insurance costs are on the rise, with homeowners insurance costs rising 42% since 2009. However, many people lead healthy and low-risk lifestyles, which should qualify them for lower premiums in their life and home insurance policies. For instance, if someone actively tries to exercise more and eat healthier, or installs smoke detectors, storm shutters, and deadbolt locks in their home, they are lowering their risk and should be rewarded with lower premiums. However, it’s difficult to prove that these safe activities have been completed. If users submit reports over time, a lot of tedious and repetitive work must be done by both customers and the insurance company. For example, the insurance company would need to manually review images of installed smoke detectors or invoices for devices the user bought. Or, they might check a customer’s medical history and daily exercise routines. Even if an insurance company completes an initial review at the beginning of a policy, safety data is changing on a daily basis.

We wanted to tackle this tedious task by automating it with machine learning (specifically computer vision and natural language processing) in a sleek, intuitive, and accessible interface.

## What it does

We developed Live Safe and Save, an all-in-one solution that allows users to log activities that could give discounts in their home and life insurance premiums.

Our web-app features a “Home insurance” tab that allows users to take pictures of various devices in their home that could prove their efforts to lower their risk, such as smoke detectors, storm shutters, and deadbolt locks. The user is also able to input pictures or pdfs of invoices to prove that they are utilizing those safety features. To avoid the tedious manual verification of user input data, we built a backend to check if user input data is what they claim it to be, using a zero-shot, image labeling machine learning model. After inputting that information, it will estimate the discount the user can receive.

The other tab, the “Life insurance” tab, allows users to connect to [Google Fit](https://www.google.com/fit/), which synchronizes real-time information about your heart score, daily step counter, diet, and other metrics into our app. Google Fit was chosen because of its existing ecosystem of integrations. In fact, there are over [50 large apps](https://play.google.com/store/apps/collection/promotion_3000e6f_googlefit_all) in the Google App store alone, which connect with Google Fit. These apps connect to wearables and other smart health devices, track health data such as weight and caloric intake, and automatically import workouts. We use all of this data to generate an aggregate score, and compare it to other that of other users in the platform. Your score and ranking can result in significant life insurance discounts!

## How we built it

### Frontend

The frontend is built with Next.js (React framework) and styled with TailwindCSS. Data is communicated across 3 sources: The Next.js API endpoints, the Firestore backend, and the Flask backend.

### Backend

#### Flask API

The backend server was built with Flask in Python. We required a Python backend in addition to the Next API, for ease of integrating the machine learning models.

#### Classifying home safety features
To determine if a user's picture of an object is what they claim it to be, such as a smoke detector, we utilized Contrastive Language-Image Pre-Training ([CLIP](https://github.com/openai/CLIP)). CLIP is a state of the art, deep neural model with zero-shot capabilities for image classification. We decided to try CLIP because most image classification models (Google Cloud Vision, Tensorflow, MediaPipe) are not trained on the objects we wanted to detect. As such, they cannot be applied without intensive re-training. CLIP’s zero-shot capabilities, on the other hand, allow it to classify classes it was not trained on.

#### Extracting invoice information
We also wanted to provide users with the option to upload invoices, in the case of larger projects (such as heating and electrical upgrades, or roofing changes). To extract information from an image of the invoice, we first utilized image to text recognition through computer vision and subsequent natural language processing using a recurrent neural network to determine what text represents the company name, the address, date, etc. The models were trained using the invoices training dataset provided by CBRE.

## Challenges we ran into

Due to time constraints of the hackathon, we were not able to train a supervised model with custom labels like smoke detectors. Current models online based purely on supervised learning do not contain those labels by default. Thus, we spent a lot of time and effort trying to train our own model. We later realized we could use OpenAI’s pre-trained zero-shot learning model, released in 2021 and still in active development. Zero-shot utilizes previously known relationships between objects to be able to predict new labels—without specifically pre-training for those labels!

Another challenge we ran into was the lack of training data for the natural language processing task, with invoices. We were thus unable to achieve a high accuracy. Also, we were unable to finish all the logic to use natural language processing to determine if the user bought, say, smoke detectors, given a receipt of the form. The model is able to determine what the user bought, but it still thinks that “smoke alarm” is different from “smoke detector” (it cannot derive the semantics of phrases).

## Accomplishments that we are proud of

We are proud of our UI/UX design, which we tried to make as minimal and intuitive as possible. We were also really surprised by how well the zero-shot learning model worked for data that it has never seen before, and we are really proud that we were able to implement that feature into our app. This state-of-the-art technology will only become more prevalent in the world in the coming years, and we’re happy to have found a perfect application for it. We think such features would greatly help everyone, especially since we all need home and life insurance and would like discounts :D.

## What we learned

- How insurance customers can promote lower risk and thus get lower premiums.
- The powerful capabilities of different machine learning frameworks as it pertains to regular classification or zero shot learning, and natural language processing with recurrent neural networks.

## What's next for Live Safe and Save

- Incorporate more data pertaining to insurance risk into our application, such as home break-in detection using security cameras and smart house endpoints, and google maps
- Develop a mobile app, which can be used to directly take images of home safety features. This makes for an even smoother user experience.
- Further prevent cheating by using a reverse image search API, to determine if the photo is genuine.

# Backend Documentation
Windows venv setup (in command prompt):
```
python -m venv ./venv
venv\Scripts\activate.bat
```

To install dependencies for zero shot:  
`pip install torchvision ftfy regex tqdm`  
`pip install git+https://github.com/openai/CLIP.git`  

To run the server: `flask run`

`/objectDetect`  
post request:   
please send `{'image': image, 'expected': (string) expected class of object (is it ["smoke detector", "lock", "fire extinguisher"])}`

if the image matches expected, returns json {'msg': 'success', 'result': True}, else {'msg': 'success', 'result': False}

To install dependencies for InvoiceNet, follow this link: https://github.com/naiveHobo/InvoiceNet

`/invoiceDetect`
post request: 
please send `{'image': image}`

returns json `{'msg': 'success', 'result': {address: string, date: string, total: string, vendor_name: string}}`