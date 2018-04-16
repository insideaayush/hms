from django.conf import settings
from django.db import models
# from django.contrib.auth.models import User
from django.utils.text import slugify
from django.utils import timezone
from django.contrib.auth.models import AbstractUser
from sequences import get_next_value
from django.db import transaction

class User(AbstractUser):
    is_patient = models.BooleanField(default=False)
    is_doctor = models.BooleanField(default=False)
    is_clinic = models.BooleanField(default=False)


"""
# Blog related models
class Category(models.Model):
    name = models.CharField(max_length=32)

    class Meta:
        verbose_name_plural = "Categories"

    def __unicode__(self):
        return self.name

    def __str__(self):
        return self.name

class Tag(models.Model):
    name = models.CharField(max_length=32)

    def __unicode__(self):
        return self.name

    def __str__(self):
        return self.name

class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    title = models.CharField(max_length=64,unique=True)
    tags = models.ManyToManyField(Tag)
    byline = models.CharField(max_length=255, blank=True)
    description = models.TextField(blank=True)
    slug = models.SlugField(max_length=128, unique=True, blank=True)
    content = models.TextField()
    background_image = models.ImageField(null=True, blank=True)
    updated_on = models.DateTimeField(auto_now=True)
    created_on = models.DateTimeField(auto_now_add=True)
    publish_on = models.DateTimeField()
    list_display = ('title', 'category', 'tags', 'author', 'publish_on','created_on','updated_on')
    search_fields = ['title','byline','symbol']
    list_filter = ['publish_on','created_on']
    date_hierarchy = 'pub_date'

    def __unicode__(self):
        return self.title

    def __str__(self):
        return self.title

    def _get_unique_slug(self):
        slug = slugify(self.title)
        unique_slug = slug
        num = 1
        while Post.objects.filter(slug=unique_slug).exists():
            unique_slug = '{}-{}'.format(slug, num)
            num += 1
        return unique_slug

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = self._get_unique_slug()
        super(Post, self).save(*args, **kwargs)
"""

ALL_SUBSCRIPTIONS = [
    ('N', 'Subscription Level N'),
    ('A', 'Subscription Level A'),
    ('B', 'Subscription Level B'),
    ('C', 'Subscription Level C'),
]

ALL_APPOINTMENT_STATUSES = [
    ('R', 'Requested'),
    ('C', 'Confirmed'),
    ('S', 'Completed'),
    ('F', 'Failed'),
]

DOCTOR_TYPES = [
    ('ALLERG' , 'Allergist or Immunologist'),
    ('ANESTH' , 'Anesthesiologist'),
    ('CARDIO' , 'Cardiologist'),
    ('DERMAT' , 'Dermatologist'),
    ('GASTRO' , 'Gastroenterologist'),
    ('HEMATO' , 'Hematologist/Oncologist'),
    ('IPHYSI' , 'Internal Medicine Physician'),
    ('NEPHRO' , 'Nephrologist'),
    ('NEUROL' , 'Neurologist'),
    ('NEUROS' , 'Neurosurgeon'),
    ('OBSTET' , 'Obstetrician'),
    ('GYNECO' , 'Gynecologist'),
    ('NUMIWF' , 'Nurse Midwifery'),
    ('OPHYSI' , 'Occupational Medicine Physician'),
    ('OPTHAL' , 'Ophthalmologist'),
    ('ORMAXS' , 'Oral and Maxillofacial Surgeon'),
    ('ORTHOS' , 'Orthopaedic Surgeon'),
    ('OTOLAS' , 'Otolaryngologist (Head and Neck Surgeon)'),
    ('PATHOL' , 'Pathologist'),
    ('PEDIAT' , 'Pediatrician'),
    ('PLASTS' , 'Plastic Surgeon'),
    ('PODIAT' , 'Podiatrist'),
    ('PSYCHI' , 'Psychiatrist'),
    ('PUPHYS' , 'Pulmonary Medicine Physician'),
    ('RADONC' , 'Radiation Onconlogist'),
    ('DIARAD' , 'Diagnostic Radiologist'),
    ('RHEUMA' , 'Rheumatologist'),
    ('UROLOG' , 'Urologist'),
]

DOCTOR_TYPES_VERBROSE = {
    'ALLERG' :  "conducts the diagnosis and treatment of allergic conditions",
    'ANESTH' :  "treats chronic pain syndromes; administers anesthesia and monitors the patient during surgery",
    'CARDIO' :  "treats heart disease",
    'DERMAT' :  "treats skin diseases, including some skin cancers",
    'GASTRO' :  "treats stomach disorders",
    'HEMATO' :  "treats diseases of the blood and blood forming tissues (oncology including cancer and other tumors)",
    'IPHYSI' :  "treats diseases and disorders of internal structures of the body",
    'NEPHRO' :  "treats kidney diseases",
    'NEUROL' :  "treats diseases and disorders of the nervous system.",
    'NEUROS' :  "conducts surgery of the nervous system.",
    'OBSTET' :  "treats women during pregnancy and childbirth",
    'GYNECO' :  "treats diseases of the female reproductive system and genital tract.",
    'NUMIWF' :  "manages a woman's health care, especially during pregnancy, delivery, and the postpartum period",
    'OPHYSI' :  "diagnoses and treats work related disease or injury.",
    'OPTHAL' :  "treats eye defects, injuries, and diseases.",
    'ORMAXS' :  "surgically treats diseases, injuries, and defects of the hard and soft tissues of the face, mouth, and jaws.",
    'ORTHOS' :  "preserves and restores the function of the musculoskeletal system.",
    'OTOLAS' :  "treats diseases of the ear, nose, and throat,and some diseases of the head and neck, including facial plastic surgery.",
    'PATHOL' :  "diagnoses and treats the study of the changes in body tissues and organs which cause or are caused by disease",
    'PEDIAT' :  "treats infants, toddlers, children and teenagers.",
    'PLASTS' :  "restores, reconstructs, corrects or improves in the shape and appearance of damaged body structures, especially the face.",
    'PODIAT' :  "provides medical and surgical treatment of the foot.",
    'PSYCHI' :  "treats patients with mental and emotional disorders. ",
    'PUPHYS' :  "diagnoses and treats lung disorders.",
    'RADONC' :  "diagnoses and treats disorders with the use of diagnostic imaging, including X rays, sound waves, radioactive substances, and magnetic fields. ",
    'DIARAD' :  "diagnoses and medically treats diseases and disorders of internal structures of the body.",
    'RHEUMA' :  "treats rheumatic diseases, or conditions characterized by inflammation, soreness and stiffness of muscles, and pain in joints and associated structures",
    'UROLOG' :  "diagnoses and treats the male and female urinary tract and the male reproductive system",
}

ALL_GENDERS = [
    ('M', 'Male'),
    ('F', 'Female'),
    ('T', 'Third Gender'),
]

# Direct Health care models
class Patient(models.Model):
    user = models.ForeignKey(User,related_name="patient" ,on_delete=models.CASCADE)
    mobile = models.CharField(max_length=200)
    gender = models.CharField(max_length=100, choices=ALL_GENDERS, default="M")
    has_subscription = models.BooleanField(default=False)
    joined_on = models.DateTimeField(auto_now_add=True)
    last_updated_on = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('last_updated_on',)

    def __str__(self):
        return "%s %s" % (self.user.first_name, self.user.last_name)
    
    def name(self):
        return "%s %s" % (self.user.first_name, self.user.last_name)

    def save(self, *args, **kwargs):
        self.user.is_patient = True
        self.user.save()
        super(Patient, self).save(*args, **kwargs)


class Clinic(models.Model):
    user = models.ForeignKey(User,related_name="clinic", on_delete=models.CASCADE)
    address = models.TextField(blank=True, default=None, null=True)
    joined_on = models.DateTimeField(auto_now_add=True)
    last_updated_on = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('last_updated_on', )

    def __str__(self):
        return "%s" % (self.user.first_name)
    
    def name(self):
        return "%s" % (self.user.first_name)

    def save(self, *args, **kwargs):
        self.user.is_clinic = True
        self.user.save()
        super(Clinic, self).save(*args, **kwargs)

class Doctor(models.Model):
    user = models.ForeignKey(User, related_name="doctor", on_delete=models.CASCADE)
    available_at = models.ForeignKey(Clinic, related_name="available_doctors", on_delete=models.SET_NULL, null=True, blank=True, default=None)
    all_clinics = models.ManyToManyField(Clinic)
    specialization = models.CharField(max_length=255, choices=DOCTOR_TYPES, default=None, null = True, blank=True)
    description = models.CharField(max_length=255, default=None, null=True, blank=True)
    joined_on = models.DateTimeField(auto_now_add=True)
    last_updated_on = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('last_updated_on', )

    def __str__(self):
        return "%s %s" % (self.user.first_name, self.user.last_name)
    
    def name(self):
        return "%s %s" % (self.user.first_name, self.user.last_name)

    def display_all_clinics(self):
        """
        Creates a string for the Clinic. This is required to display clinics in Admin.
        """
        return ', '.join([ clinic.__str__() for clinic in self.all_clinics.all()[:3] ])

    display_all_clinics.short_description = 'Clinics'

    def save(self, *args, **kwargs):
        if not self.description:
            if DOCTOR_TYPES_VERBROSE[self.specialization]:
                self.description = DOCTOR_TYPES_VERBROSE[self.specialization]
        self.user.is_doctor = True
        self.user.save()
        super(Doctor, self).save(*args, **kwargs)


class Appointment(models.Model):
    booking_id = models.CharField(max_length=255,unique=True, blank=True, null=True)
    book_by = models.ForeignKey(Patient, on_delete=models.CASCADE)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    location = models.ForeignKey(Clinic, on_delete=models.CASCADE)
    status = models.CharField(max_length=100, choices=ALL_APPOINTMENT_STATUSES, default="R")
    created_on = models.DateTimeField(auto_now_add=True)
    last_updated_on = models.DateTimeField(auto_now=True)
    preferred_time = models.DateTimeField(null=True, blank=True, default=None)
    appointment_time = models.DateTimeField(null=True, default=None, blank=True)

    class Meta:
        ordering = ('last_updated_on', )

    def __str__(self):
        return self.booking_id

    def save(self, *args, **kwargs):
        if not self.booking_id:
            with transaction.atomic():
                book_id = "BOOK000%d" % (get_next_value('BOOK000'))
                self.booking_id = book_id
        super(Appointment, self).save(*args, **kwargs)


class DirectCarePlan(models.Model):
    kind = models.CharField(max_length=200)

    def __str__(self):
        return self.kind

class Subscription(models.Model):
    kind = models.ForeignKey(DirectCarePlan, on_delete=models.SET_NULL, null=True)
    patient = models.OneToOneField(Patient, on_delete=models.CASCADE)
    active = models.BooleanField(default=False)
    created_on = models.DateTimeField(auto_now_add=True)
    last_updated_on = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('last_updated_on', )

    def __str__(self):
        _str  = self.kind.kind if (self.kind != None) else 'No info on subscription'
        return _str