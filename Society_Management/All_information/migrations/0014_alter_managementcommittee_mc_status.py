# Generated by Django 5.1.2 on 2024-10-25 09:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('All_information', '0013_alter_managementcommittee_mc_ending_date_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='managementcommittee',
            name='mc_status',
            field=models.IntegerField(choices=[(1, 'Active'), (0, 'Expired')], default=1),
        ),
    ]
