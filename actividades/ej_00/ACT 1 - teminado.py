import network
from time import sleep
from machine import Pin, SoftI2C
import ssd1306


# Configuración I2C (pines SDA=21, SCL=22, addr=0x3C)
i2c = SoftI2C(sda=Pin(21), scl=Pin(22), freq=400000)
oled = ssd1306.SSD1306_I2C(128, 64, i2c, addr=0x3C)

# Función para conectar al WiFi (retorna IP en índice [2])
def connect_wifi(ssid, password):
    sta_if = network.WLAN(network.STA_IF)
    sta_if.active(True)
    sta_if.connect(ssid, password)
    while not sta_if.isconnected():
        print(".", end="")
        sleep(0.5)
    return sta_if.ifconfig()[2]  # IP en posición [2]

# Conecta al WiFi (¡cambia SSID y contraseña!)
ip = connect_wifi("Cooperadora Alumnos", "")

# Muestra "Hola mundo!" en (1, 1) y la IP debajo
oled.fill(0)
oled.text("Hola mundo!", 1, 1)  # Posición (1,1) para mejor visualización
oled.text("IP:", 1, 23)
oled.text(ip, 1, 35)
oled.show()