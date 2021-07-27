
from django.test import TestCase
from django.utils import timezone

# Create your tests here.

from ..models import *
from accounts.models import Account

class GeneracionModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        #Set up non-modified objects used by all test methods
        account = Account.objects.create(
            email='luisalvaranleav@gmail.com', first_name='Luis', last_name='Albaran', rol='docente', 
            fecha_nac='1996-08-18', password='root1234'
        )
        GeneracionModel.objects.create(
            id='ff6eb8f3-38a1-4457-9f93-5bd0742d1366', n_examenes=10, longit_texto=500, n_preguntas=5, inicio_oracion='Aleatorio', account=account
            )
        GeneracionModel.objects.create(
            id='ff6eb8f3-38a1-4457-9f93-5bd0742d1367', n_examenes=10, n_preguntas=5, account=account)

    ## Pruebas para etiquetas (labels)
    def test_inicio_oracion_label(self):
        generacion=GeneracionModel.objects.get(id='ff6eb8f3-38a1-4457-9f93-5bd0742d1366')
        field_label = generacion._meta.get_field('inicio_oracion').verbose_name
        self.assertEquals(field_label,'inicio oracion')

    def test_n_examenes_label(self):
        generacion=GeneracionModel.objects.get(id='ff6eb8f3-38a1-4457-9f93-5bd0742d1366')
        field_label = generacion._meta.get_field('n_examenes').verbose_name
        self.assertEquals(field_label,'n examenes')

    def test_longit_texto_label(self):
        generacion=GeneracionModel.objects.get(id='ff6eb8f3-38a1-4457-9f93-5bd0742d1366')
        field_label = generacion._meta.get_field('longit_texto').verbose_name
        self.assertEquals(field_label,'longit texto')
    
    def test_fecha_generacion_label(self):
        generacion=GeneracionModel.objects.get(id='ff6eb8f3-38a1-4457-9f93-5bd0742d1366')
        field_label = generacion._meta.get_field('fecha_generacion').verbose_name
        self.assertEquals(field_label,'fecha generacion')
    
    def test_account_label(self):
        generacion=GeneracionModel.objects.get(id='ff6eb8f3-38a1-4457-9f93-5bd0742d1366')
        field_label = generacion._meta.get_field('account').verbose_name
        self.assertEquals(field_label,'account')
    
    ## Tests max lengths
    def test_id_max_length(self):
        generacion=GeneracionModel.objects.get(id='ff6eb8f3-38a1-4457-9f93-5bd0742d1366')
        max_length = generacion._meta.get_field('id').max_length
        self.assertEquals(max_length, 255)

    def test_inicio_oracion_max_length(self):
        generacion=GeneracionModel.objects.get(id='ff6eb8f3-38a1-4457-9f93-5bd0742d1366')
        max_length = generacion._meta.get_field('inicio_oracion').max_length
        self.assertEquals(max_length, 30)

    ## Default values
    def test_longit_text_default_value(self):
        generacion=GeneracionModel.objects.get(id='ff6eb8f3-38a1-4457-9f93-5bd0742d1367')
        default_value = generacion.longit_texto
        self.assertEquals(default_value, 200)
    
    def test_inicio_oracion_default_value(self):
        generacion=GeneracionModel.objects.get(id='ff6eb8f3-38a1-4457-9f93-5bd0742d1367')
        default_value = generacion.inicio_oracion
        self.assertEquals(default_value, 'Aleatorio')


class GeneracionTextoModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        #Set up non-modified objects used by all test methods
        account = Account.objects.create(
            email='luisalvaranleav@gmail.com', first_name='Luis', last_name='Albaran', rol='docente', 
            fecha_nac='1996-08-18', password='root1234'
        )
        generacion = GeneracionModel.objects.create(
            id='ff6eb8f3-38a1-4457-9f93-5bd0742d1366', n_examenes=10, longit_texto=500, n_preguntas=5, inicio_oracion='Aleatorio', account=account
            )
        
        GeneracionTextoModel.objects.create(
            id_texto = 'fffea8da-c831', cuerpo_texto='', generacion=generacion
        )
    
    ## Pruebas para etiquetas (labels)
    def test_id_texto_label(self):
        generacion_texto=GeneracionTextoModel.objects.get(id_texto='fffea8da-c831')
        field_label = generacion_texto._meta.get_field('id_texto').verbose_name
        self.assertEquals(field_label,'id texto')

    def test_cuerpo_texto_label(self):
        generacion_texto=GeneracionTextoModel.objects.get(id_texto='fffea8da-c831')
        field_label = generacion_texto._meta.get_field('cuerpo_texto').verbose_name
        self.assertEquals(field_label,'cuerpo texto')

    def test_es_editado_label(self):
        generacion_texto=GeneracionTextoModel.objects.get(id_texto='fffea8da-c831')
        field_label = generacion_texto._meta.get_field('es_editado').verbose_name
        self.assertEquals(field_label,'es editado')

    def test_es_regenerado_label(self):
        generacion_texto=GeneracionTextoModel.objects.get(id_texto='fffea8da-c831')
        field_label = generacion_texto._meta.get_field('es_regenerado').verbose_name
        self.assertEquals(field_label,'es regenerado')
    
    ## Tests max lengths
    def test_id_max_length(self):
        generacion_texto=GeneracionTextoModel.objects.get(id_texto='fffea8da-c831')
        max_length = generacion_texto._meta.get_field('id_texto').max_length
        self.assertEquals(max_length, 255)

    def test_cuerpo_texto_max_length(self):
        generacion_texto=GeneracionTextoModel.objects.get(id_texto='fffea8da-c831')
        max_length = generacion_texto._meta.get_field('cuerpo_texto').max_length
        self.assertEquals(max_length, 2000)


class GeneracionPreguntaModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        #Set up non-modified objects used by all test methods
        account = Account.objects.create(
            email='luisalvaranleav@gmail.com', first_name='Luis', last_name='Albaran', rol='docente', 
            fecha_nac='1996-08-18', password='root1234'
        )
        generacion = GeneracionModel.objects.create(
            id='ff6eb8f3-38a1-4457-9f93-5bd0742d1366', n_examenes=10, longit_texto=500, n_preguntas=5, inicio_oracion='Aleatorio', account=account
            )
        
        generacion_texto = GeneracionTextoModel.objects.create(
            id_texto = 'fffea8da-c831', cuerpo_texto='A computer program is a  program that runs on or has been used by more than one person. It is a computer program which is used on a computer for the purpose "to compile data on another computer, to obtain new data or to alter existing data. For example, you have a Computer running Java, which runs a program called "Java Studio ." A Computer is a computer program which contains its own instructions, such as executing Java code, and which interprets that instruction. These instructions are made available to other programmers using that computer for copying to or from other computers, so that there are no modifications necessary. For example, two computers, one running Java and another running Java Studio, can do more than one thing, and some can do more than one thing. When you take each of the computer programs, you also define what kind of programs that Computer is supposed to run.', generacion=generacion
        )

        GeneracionPreguntaModel.objects.create(
            id_pregunta='ff59234c', pregunta_cuerpo='What is a computer program?', 
            respuesta_correcta='A computer program is a program that runs on or has been used by more than one person.', 
            generacion_texto=generacion_texto
        )

    
    ## Pruebas para etiquetas (labels)
    def test_id_pregunta_label(self):
        generacion_pregunta=GeneracionPreguntaModel.objects.get(id_pregunta='ff59234c')
        field_label = generacion_pregunta._meta.get_field('id_pregunta').verbose_name
        self.assertEquals(field_label,'id pregunta')

    def test_pregunta_cuerpo_label(self):
        generacion_pregunta=GeneracionPreguntaModel.objects.get(id_pregunta='ff59234c')
        field_label = generacion_pregunta._meta.get_field('pregunta_cuerpo').verbose_name
        self.assertEquals(field_label,'pregunta cuerpo')

    def test_respuesta_correcta_label(self):
        generacion_pregunta=GeneracionPreguntaModel.objects.get(id_pregunta='ff59234c')
        field_label = generacion_pregunta._meta.get_field('respuesta_correcta').verbose_name
        self.assertEquals(field_label,'respuesta correcta')

    ## Tests max lengths
    def test_id_pregunta_max_length(self):
        generacion_pregunta=GeneracionPreguntaModel.objects.get(id_pregunta='ff59234c')
        max_length = generacion_pregunta._meta.get_field('id_pregunta').max_length
        self.assertEquals(max_length, 255)

    def test_pregunta_cuerpo_length(self):
        generacion_pregunta=GeneracionPreguntaModel.objects.get(id_pregunta='ff59234c')
        max_length = generacion_pregunta._meta.get_field('pregunta_cuerpo').max_length
        self.assertEquals(max_length, 1000)

    def test_respuesta_correcta_max_length(self):
        generacion_pregunta=GeneracionPreguntaModel.objects.get(id_pregunta='ff59234c')
        max_length = generacion_pregunta._meta.get_field('respuesta_correcta').max_length
        self.assertEquals(max_length, 1000)


class GeneracionTipoPreguntaModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        #Set up non-modified objects used by all test methods
        account = Account.objects.create(
            email='luisalvaranleav@gmail.com', first_name='Luis', last_name='Albaran', rol='docente', 
            fecha_nac='1996-08-18', password='root1234'
        )
        generacion = GeneracionModel.objects.create(
            id='ff6eb8f3-38a1-4457-9f93-5bd0742d1366', n_examenes=10, longit_texto=500, n_preguntas=5, inicio_oracion='Aleatorio', account=account
            )
        
        TipoPreguntaModel.objects.create(
            generacion=generacion, pregunta_abierta=True, opcion_multiple=True, completacion=False, 
        )

    ## Pruebas para etiquetas (labels)
    def test_pregunta_abierta_label(self):
        generacion = GeneracionModel.objects.get(id='ff6eb8f3-38a1-4457-9f93-5bd0742d1366')
        tipo_pregunta=TipoPreguntaModel.objects.get(generacion=generacion)
        field_label = tipo_pregunta._meta.get_field('pregunta_abierta').verbose_name
        self.assertEquals(field_label,'pregunta abierta')

    def test_opcion_multiple_label(self):
        generacion = GeneracionModel.objects.get(id='ff6eb8f3-38a1-4457-9f93-5bd0742d1366')
        tipo_pregunta=TipoPreguntaModel.objects.get(generacion=generacion)
        field_label = tipo_pregunta._meta.get_field('opcion_multiple').verbose_name
        self.assertEquals(field_label,'opcion multiple')


class RespuestaCuerpoModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        #Set up non-modified objects used by all test methods
        account = Account.objects.create(
            email='luisalvaranleav@gmail.com', first_name='Luis', last_name='Albaran', rol='docente', 
            fecha_nac='1996-08-18', password='root1234'
        )
        generacion = GeneracionModel.objects.create(
            id='ff6eb8f3-38a1-4457-9f93-5bd0742d1366', n_examenes=10, longit_texto=500, n_preguntas=5, inicio_oracion='Aleatorio', account=account
            )
        
        generacion_texto = GeneracionTextoModel.objects.create(
            id_texto = 'fffea8da-c831', cuerpo_texto='A computer program is a  program that runs on or has been used by more than one person. It is a computer program which is used on a computer for the purpose "to compile data on another computer, to obtain new data or to alter existing data. For example, you have a Computer running Java, which runs a program called "Java Studio ." A Computer is a computer program which contains its own instructions, such as executing Java code, and which interprets that instruction. These instructions are made available to other programmers using that computer for copying to or from other computers, so that there are no modifications necessary. For example, two computers, one running Java and another running Java Studio, can do more than one thing, and some can do more than one thing. When you take each of the computer programs, you also define what kind of programs that Computer is supposed to run.', generacion=generacion
        )

        generacion_pregunta = GeneracionPreguntaModel.objects.create(
            id_pregunta='ff59234c', pregunta_cuerpo='What is a computer program?', 
            respuesta_correcta='A computer program is a program that runs on or has been used by more than one person.', 
            generacion_texto=generacion_texto
        )

        RespuestaCuerpoModel.objects.create(
            generacion_pregunta=generacion_pregunta,
            resp_unica='',
            opcion_multiple='',
            completacion=''
        )

    ## Pruebas para etiquetas (labels)
    def test_pregunta_abierta_label(self):
        generacion_pregunta = GeneracionPreguntaModel.objects.get(id_pregunta='ff59234c')
        respuesta_cuerpo=RespuestaCuerpoModel.objects.get(generacion_pregunta=generacion_pregunta)
        field_label = respuesta_cuerpo._meta.get_field('resp_unica').verbose_name
        self.assertEquals(field_label,'resp unica')
    
    def test_pregunta_abierta_label(self):
        generacion_pregunta = GeneracionPreguntaModel.objects.get(id_pregunta='ff59234c')
        respuesta_cuerpo=RespuestaCuerpoModel.objects.get(generacion_pregunta=generacion_pregunta)
        field_label = respuesta_cuerpo._meta.get_field('opcion_multiple').verbose_name
        self.assertEquals(field_label,'opcion multiple')


    ## Tests max lengths
    def test_resp_unica_max_length(self):
        generacion_pregunta=GeneracionPreguntaModel.objects.get(id_pregunta='ff59234c')
        respuesta_cuerpo=RespuestaCuerpoModel.objects.get(generacion_pregunta=generacion_pregunta)
        max_length = respuesta_cuerpo._meta.get_field('resp_unica').max_length
        self.assertEquals(max_length, 1000)

    def test_opcion_multiple_length(self):
        generacion_pregunta=GeneracionPreguntaModel.objects.get(id_pregunta='ff59234c')
        respuesta_cuerpo=RespuestaCuerpoModel.objects.get(generacion_pregunta=generacion_pregunta)
        max_length = respuesta_cuerpo._meta.get_field('opcion_multiple').max_length
        self.assertEquals(max_length, 100)


class ExamenConfiguracionModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        #Set up non-modified objects used by all test methods
        account = Account.objects.create(
            email='luisalvaranleav@gmail.com', first_name='Luis', last_name='Albaran', rol='docente', 
            fecha_nac='1996-08-18', password='root1234'
        )
        generacion = GeneracionModel.objects.create(
            id='ff6eb8f3-38a1-4457-9f93-5bd0742d1366', n_examenes=10, longit_texto=500, n_preguntas=5, inicio_oracion='Aleatorio', account=account
            )

        ExamenConfiguracionModel.objects.create(
            id_configuracion_examen = '50892f91',
            title_exam = 'Analysis',
            contrasena_exam = '1234',
            fecha_hora_ini = timezone.now(),
            fecha_hora_fin = timezone.now(),
            duracion = 2, 
            generacion=generacion,
        )
        
    ## Pruebas para etiquetas (labels)
    def test_id_configuracion_examen_label(self):
        examen_configuracion=ExamenConfiguracionModel.objects.get(id_configuracion_examen='50892f91')
        field_label = examen_configuracion._meta.get_field('id_configuracion_examen').verbose_name
        self.assertEquals(field_label,'id configuracion examen')
    
    def test_title_exam_label(self):
        examen_configuracion=ExamenConfiguracionModel.objects.get(id_configuracion_examen='50892f91')
        field_label = examen_configuracion._meta.get_field('title_exam').verbose_name
        self.assertEquals(field_label,'title exam')

    def test_contrasena_exam_label(self):
        examen_configuracion=ExamenConfiguracionModel.objects.get(id_configuracion_examen='50892f91')
        field_label = examen_configuracion._meta.get_field('contrasena_exam').verbose_name
        self.assertEquals(field_label,'contrasena exam')

    def test_n_intentos_examen_label(self):
        examen_configuracion=ExamenConfiguracionModel.objects.get(id_configuracion_examen='50892f91')
        field_label = examen_configuracion._meta.get_field('n_intentos').verbose_name
        self.assertEquals(field_label,'n intentos')

    def test_fecha_hora_ini_label(self):
        examen_configuracion=ExamenConfiguracionModel.objects.get(id_configuracion_examen='50892f91')
        field_label = examen_configuracion._meta.get_field('fecha_hora_ini').verbose_name
        self.assertEquals(field_label,'fecha hora ini')

    def test_fecha_hora_fin_label(self):
        examen_configuracion=ExamenConfiguracionModel.objects.get(id_configuracion_examen='50892f91')
        field_label = examen_configuracion._meta.get_field('fecha_hora_fin').verbose_name
        self.assertEquals(field_label,'fecha hora fin')
    
     ## Tests max lengths
    def test_title_exam_max_length(self):
        examen_configuracion=ExamenConfiguracionModel.objects.get(id_configuracion_examen='50892f91')
        max_length = examen_configuracion._meta.get_field('title_exam').max_length
        self.assertEquals(max_length, 200)

    def test_contrasena_exam_length(self):
        examen_configuracion=ExamenConfiguracionModel.objects.get(id_configuracion_examen='50892f91')
        max_length = examen_configuracion._meta.get_field('contrasena_exam').max_length
        self.assertEquals(max_length, 200)


class ExamenModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        #Set up non-modified objects used by all test methods
        account = Account.objects.create(
            email='luisalvaranleav@gmail.com', first_name='Luis', last_name='Albaran', rol='docente', 
            fecha_nac='1996-08-18', password='root1234'
        )
        generacion = GeneracionModel.objects.create(
            id='ff6eb8f3-38a1-4457-9f93-5bd0742d1366', n_examenes=10, longit_texto=500, n_preguntas=5, inicio_oracion='Aleatorio', account=account
            )

        generacion_texto = GeneracionTextoModel.objects.create(
            id_texto = 'fffea8da-c831', cuerpo_texto='A computer program is a  program that runs on or has been used by more than one person. It is a computer program which is used on a computer for the purpose "to compile data on another computer, to obtain new data or to alter existing data. For example, you have a Computer running Java, which runs a program called "Java Studio ." A Computer is a computer program which contains its own instructions, such as executing Java code, and which interprets that instruction. These instructions are made available to other programmers using that computer for copying to or from other computers, so that there are no modifications necessary. For example, two computers, one running Java and another running Java Studio, can do more than one thing, and some can do more than one thing. When you take each of the computer programs, you also define what kind of programs that Computer is supposed to run.', generacion=generacion
        )

        examen_configuracion = ExamenConfiguracionModel.objects.create(
            id_configuracion_examen = '50892f91',
            title_exam = 'Analysis',
            contrasena_exam = '1234',
            fecha_hora_ini = timezone.now(),
            fecha_hora_fin = timezone.now(),
            duracion = 2, 
            generacion=generacion,
        )
        
        ExamenModel.objects.create(
            id_examen='ff638ffe',
            assigned_to=account,
            texto=generacion_texto,
            examen_configuracion=examen_configuracion,
        )

    ## Pruebas para etiquetas (labels)
    def test_id_examen_label(self):
        examen=ExamenModel.objects.get(id_examen='ff638ffe')
        field_label = examen._meta.get_field('id_examen').verbose_name
        self.assertEquals(field_label,'id examen')
    
    def test_assigned_to_label(self):
        examen=ExamenModel.objects.get(id_examen='ff638ffe')
        field_label = examen._meta.get_field('assigned_to').verbose_name
        self.assertEquals(field_label,'assigned to')

    def test_fecha_contestado_label(self):
        examen=ExamenModel.objects.get(id_examen='ff638ffe')
        field_label = examen._meta.get_field('fecha_contestado').verbose_name
        self.assertEquals(field_label,'fecha contestado')
    
     ## Tests max lengths
    def test_id_examen_max_length(self):
        examen=ExamenModel.objects.get(id_examen='ff638ffe')
        max_length = examen._meta.get_field('id_examen').max_length
        self.assertEquals(max_length, 255)

    
class CalificacionModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        #Set up non-modified objects used by all test methods
        account = Account.objects.create(
            email='luisalvaranleav@gmail.com', first_name='Luis', last_name='Albaran', rol='docente', 
            fecha_nac='1996-08-18', password='root1234'
        )
        generacion = GeneracionModel.objects.create(
            id='ff6eb8f3-38a1-4457-9f93-5bd0742d1366', n_examenes=10, longit_texto=500, n_preguntas=5, inicio_oracion='Aleatorio', account=account
            )

        generacion_texto = GeneracionTextoModel.objects.create(
            id_texto = 'fffea8da-c831', cuerpo_texto='A computer program is a  program that runs on or has been used by more than one person. It is a computer program which is used on a computer for the purpose "to compile data on another computer, to obtain new data or to alter existing data. For example, you have a Computer running Java, which runs a program called "Java Studio ." A Computer is a computer program which contains its own instructions, such as executing Java code, and which interprets that instruction. These instructions are made available to other programmers using that computer for copying to or from other computers, so that there are no modifications necessary. For example, two computers, one running Java and another running Java Studio, can do more than one thing, and some can do more than one thing. When you take each of the computer programs, you also define what kind of programs that Computer is supposed to run.', generacion=generacion
        )

        examen_configuracion = ExamenConfiguracionModel.objects.create(
            id_configuracion_examen = '50892f91',
            title_exam = 'Analysis',
            contrasena_exam = '1234',
            fecha_hora_ini = timezone.now(),
            fecha_hora_fin = timezone.now(),
            duracion = 2, 
            generacion=generacion,
        )
        
        examen = ExamenModel.objects.create(
            id_examen='ff638ffe',
            assigned_to=account,
            texto=generacion_texto,
            examen_configuracion=examen_configuracion,
        )

        CalificacionModel.objects.create(
            nota = 4.50,
            examen=examen,
        )

    ## Pruebas para etiquetas (labels)
    def test_id_calificacion_label(self):
        calificacion=CalificacionModel.objects.get(id_calificacion='1')
        field_label = calificacion._meta.get_field('id_calificacion').verbose_name
        self.assertEquals(field_label,'id calificacion')

     ## Tests max lengths
    def test_id_examen_max_length(self):
        calificacion=CalificacionModel.objects.get(id_calificacion='1')
        max_length = calificacion._meta.get_field('retroalim').max_length
        self.assertEquals(max_length, 3000)


class RespuestaPreguntaExamenModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        #Set up non-modified objects used by all test methods
        account = Account.objects.create(
            email='luisalvaranleav@gmail.com', first_name='Luis', last_name='Albaran', rol='docente', 
            fecha_nac='1996-08-18', password='root1234'
        )
        generacion = GeneracionModel.objects.create(
            id='ff6eb8f3-38a1-4457-9f93-5bd0742d1366', n_examenes=10, longit_texto=500, n_preguntas=5, inicio_oracion='Aleatorio', account=account
            )

        generacion_texto = GeneracionTextoModel.objects.create(
            id_texto = 'fffea8da-c831', cuerpo_texto='A computer program is a  program that runs on or has been used by more than one person. It is a computer program which is used on a computer for the purpose "to compile data on another computer, to obtain new data or to alter existing data. For example, you have a Computer running Java, which runs a program called "Java Studio ." A Computer is a computer program which contains its own instructions, such as executing Java code, and which interprets that instruction. These instructions are made available to other programmers using that computer for copying to or from other computers, so that there are no modifications necessary. For example, two computers, one running Java and another running Java Studio, can do more than one thing, and some can do more than one thing. When you take each of the computer programs, you also define what kind of programs that Computer is supposed to run.', generacion=generacion
        )

        examen_configuracion = ExamenConfiguracionModel.objects.create(
            id_configuracion_examen = '50892f91',
            title_exam = 'Analysis',
            contrasena_exam = '1234',
            fecha_hora_ini = timezone.now(),
            fecha_hora_fin = timezone.now(),
            duracion = 2, 
            generacion=generacion,
        )
        
        examen = ExamenModel.objects.create(
            id_examen='ff638ffe',
            assigned_to=account,
            texto=generacion_texto,
            examen_configuracion=examen_configuracion,
        )

        generacion_pregunta = GeneracionPreguntaModel.objects.create(
            id_pregunta='ff59234c', pregunta_cuerpo='What is a computer program?', 
            respuesta_correcta='A computer program is a program that runs on or has been used by more than one person.', 
            generacion_texto=generacion_texto
        )

        RespuestaPreguntaExamenModel.objects.create(
            examen=examen,
            generacion_pregunta=generacion_pregunta,
            respuesta_usuario='',
            calificacion_pregunta=0.88
        )

    ## Pruebas para etiquetas (labels)
    def test_respuesta_usuario_label(self):
        examen = ExamenModel.objects.get(id_examen='ff638ffe')
        respueta_pregunta_examen = RespuestaPreguntaExamenModel.objects.get(examen=examen)
        field_label = respueta_pregunta_examen._meta.get_field('respuesta_usuario').verbose_name
        self.assertEquals(field_label,'respuesta usuario')

    def test_calificacion_pregunta_label(self):
        examen = ExamenModel.objects.get(id_examen='ff638ffe')
        respueta_pregunta_examen = RespuestaPreguntaExamenModel.objects.get(examen=examen)
        field_label = respueta_pregunta_examen._meta.get_field('calificacion_pregunta').verbose_name
        self.assertEquals(field_label,'calificacion pregunta')

     ## Tests max lengths
    def test_respuesta_usuario_max_length(self):
        examen = ExamenModel.objects.get(id_examen='ff638ffe')
        respueta_pregunta_examen = RespuestaPreguntaExamenModel.objects.get(examen=examen)
        max_length = respueta_pregunta_examen._meta.get_field('respuesta_usuario').max_length
        self.assertEquals(max_length, 1000)