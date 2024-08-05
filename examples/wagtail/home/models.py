from django.db import models

from wagtail.models import Page
from django.template.response import TemplateResponse


class HomePage(Page):
    def get_template(self, request, *args, **kwargs):
        return 'home_page.jinja'

    def render(self, request, *args, **kwargs):
        template = self.get_template(request, *args, **kwargs)
        context = self.get_context(request, *args, **kwargs)
        return TemplateResponse(request, template, context, using='jinja2')
