# Generated by Django 3.2 on 2021-04-29 21:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('gquestions_api', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='usuarioexamengeneracion',
            old_name='email',
            new_name='account',
        ),
        migrations.RenameField(
            model_name='usuarioexamengeneracion',
            old_name='id_exam',
            new_name='examen',
        ),
        migrations.RenameField(
            model_name='usuarioexamengeneracion',
            old_name='cod_generacion',
            new_name='generacion',
        ),
    ]
