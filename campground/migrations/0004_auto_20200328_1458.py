# Generated by Django 3.0.4 on 2020-03-28 14:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('campground', '0003_auto_20200326_2207'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='campsite',
            name='max_camper_size',
        ),
        migrations.AddField(
            model_name='campsite',
            name='max_camper_length',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
    ]
