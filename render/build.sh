set -o erresxit

pip install -r requirements.txt

python manage.py collectstatic --no-input
