
from django.test import TestCase

# Create your tests here.

from ..models import *
from accounts.models import Account
from django.urls import reverse

class GeneracionListViewTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        #Create 13 authors for pagination tests
        number_of_generations = 13
        account = Account.objects.create(
            email='luisalvaranleav@gmail.com', first_name='Luis', last_name='Albaran', rol='docente', 
            fecha_nac='1996-08-18', password='root1234'
        )
        count = 0
        for count in range(number_of_generations):
            GeneracionModel.objects.create(
            id='ff6eb8f3-38a1-4457-9f93-5bd0742d136' + str(count), n_examenes=10, longit_texto=500, n_preguntas=5, inicio_oracion='Aleatorio', account=account
            )
