# E-commerce-Mayonesa-Game

## Front-end

## Back-end

### Install

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r Backend/requirements.txt
```

### Run

```bash
source venv/bin/activate
cd Backend
flask run --debug
```

### Create Date Base

```bash
sudo -u postgres psql
CREATE USER postgre WITH PASSWORD 'postgre';
ALTER USER postgre CREATEDB;
CREATE DATABASE mayonesa OWNER postgre;
\q
```

## Autores ✒️

- Almiron Leonardo - Trabajo Cooparticipacion Back-end y Crud de DB - [leonardo256](https://github.com/leonardo256)
- Vegas Gustavo - Trabajo Cooparticipacion Back-end y Crud de DB - [gustavopzvs](https://github.com/gustavopzvs)
- Vasquez Lucas - Trabajo Front-end - [lucasvasquez07](https://github.com/lucasvasquez07)
