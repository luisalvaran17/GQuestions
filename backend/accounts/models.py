from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager

# Create your models here.
ROL_USER = (('Estudiante', 'Estudiante'), 
            ('Docente', 'Docente'),
            )
class MyAccountManger (BaseUserManager):
    def create_user(self, email, first_name, last_name, rol, fecha_nac, edad,  password=None,):
        if not email:
            raise ValueError("Users must have an email address")
        user = self.model(
            email = self.normalize_email(email),
            first_name = first_name,
            last_name = last_name,
            rol = rol,
            fecha_nac = fecha_nac,
            edad = edad,
        )
        user.set_password(password)
        user.save(using=self.db)
        return user

    def create_superuser(self, email, password=None):
        user = self.create_user (
            email = self.normalize_email(email),
            password = password,
        )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self.db)
        return user

class Account(AbstractUser):
    email           = models.EmailField(verbose_name='email', max_length=255, unique=True)
    date_joined     = models.DateTimeField(verbose_name="date joined", auto_now_add=True)
    last_login      = models.DateTimeField(verbose_name="last login", auto_now=True)
    is_admin        = models.BooleanField(default=False)
    is_active       = models.BooleanField(default=True)
    is_staff        = models.BooleanField(default=False)
    is_superuser    = models.BooleanField(default=False)
    hide_email      = models.BooleanField(default=True)
    rol             = models.CharField(choices=ROL_USER, max_length=20, null=False)
    fecha_nac       = models.DateField(null=True)
    edad            = models.SmallIntegerField(null=True)

    objects = MyAccountManger()

    USERNAME_FIELD  = 'email'
    REQUIRED_FIELDS = ['rol', 'fecha_nac', 'edad']

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin