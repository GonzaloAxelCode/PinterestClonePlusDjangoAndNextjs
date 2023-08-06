from rest_framework import serializers
from .models import Pin
class PinSerializer(serializers.ModelSerializer):
    def validate_title(self, value):
        """
        Valida que no exista ya un pin con el mismo título.
        """
        if self.instance is not None and self.instance.title == value:
            return value
        if Pin.objects.filter(title=value).exists():
            raise serializers.ValidationError('Ya existe un pin con este título.')
        return value

    class Meta:
        model = Pin
        fields = '__all__'