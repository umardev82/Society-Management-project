# Generated by Django 5.1.2 on 2024-10-25 09:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('All_information', '0012_membertypesetup_managementcommittee'),
    ]

    operations = [
        migrations.AlterField(
            model_name='managementcommittee',
            name='mc_ending_date',
            field=models.DateField(),
        ),
        migrations.AlterField(
            model_name='managementcommittee',
            name='mc_joining_date',
            field=models.DateField(),
        ),
    ]
