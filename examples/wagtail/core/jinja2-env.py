from django.templatetags.static import static
from jinja2 import Environment as Jinja2Environment

def environment(**options):
    env = Jinja2Environment(**options)
    env.globals.update({
        'static': static,
    })
    return env