# Generated by Django 5.0 on 2023-12-15 06:25

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("apigateway", "0016_merge_20231213_2341"),
    ]

    operations = [
        migrations.AlterField(
            model_name="assignment",
            name="Deadline",
            field=models.DateTimeField(),
        ),
        migrations.AlterField(
            model_name="user",
            name="UserName",
            field=models.CharField(max_length=100),
        ),
    ]
