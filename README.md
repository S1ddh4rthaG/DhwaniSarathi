# HertzHearingTest

### SiH 1403 : App Based Audiometer
### Problem Description:

To know a person Hearing Loss, generally we use a Pure Tone Audiometer. To use this it requires a bulk of the instrument to be carried. This testing requires a considerable amount of time for testing. It was observed that during a large level hearing testing it is consuming much time. So a hand held Mobile phone operated APP BASED AUDIOMETER will be of immense useful in finding and detecting the hearing loss in children in a schools

### Local Dev

#### Frontend
```
cd Audiometernew
npm i
npm run web
```
#### Backend
```
cd backend

Create a Virtual Environment

Windows#
python -m venv venv   
.\venv\Scripts\Activate


linux#
python3 -m venv venv 
source venv/bin/activate

Install requirements

pip install -r requirements.txt

Intialize Db data/ Creating Models in DB

python manage.py makemigrations
python manage.py migrate

Running server

python manage.py runserver 192.168.1.5:80 
## here 192.168.1.5 is the server on which expo is running
```
### ADMIN

USERNAME - admin
PASSWORD - admin


## Reference

### Expo Router Example

Use [`expo-router`](https://expo.github.io/router) to build native navigation using files in the `app/` directory.

### 🚀 How to use

```sh
npx create-expo-app -e with-router
```

### 📝 Notes

- [Expo Router: Docs](https://expo.github.io/router)
- [Expo Router: Repo](https://github.com/expo/router)
