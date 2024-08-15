from django.templatetags.static import static
from jinja2 import Environment

def throw(msg):
    raise Exception(msg)

def environment(**options):
    env = Environment(**options)
    env.globals.update({
        'static': static,
        'throw': throw,
    })
    return env