# Generated by Django 5.1.2 on 2024-10-22 07:03

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('All_information', '0007_areatype'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='propertytype',
            name='joint_number',
        ),
        migrations.RemoveField(
            model_name='propertytype',
            name='property_number',
        ),
        migrations.AddField(
            model_name='property_info',
            name='joint_number',
            field=models.IntegerField(blank=True, help_text='Select the joint number (0, 1, 2, 3, 4) or leave empty if not applicable', null=True, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(4)]),
        ),
        migrations.AddField(
            model_name='property_info',
            name='property_number',
            field=models.IntegerField(null=True, unique=True),
        ),
    ]
