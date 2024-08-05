# Wagtail example

```
mkdir env
python3 -m venv env
source env/bin/activate
```

## Getting Started

### Install requirements

```
pip3 install -r requirements.txt
```

### Database migrations and super user

```
python3 manage.py migrate
python3 manage.py createsuperuser
```

### Run server

```
python3 manage.py runserver
```
