from langchain_community.llms import OpenAI
from langchain.prompts import PromptTemplate


from app.config.settings import settings


proxy='socks5://eren2:eren2@t.erenyeager2002.ir:8084'
llm = OpenAI(
    openai_api_base="https://llm.atenatech.ir",
    openai_api_key=settings.openai_api_key,
    model=settings.openai_model_name,
    temperature=0.7,
)

template = """
You are a greenhouse manager assistant. Based on the given sensor readings:
Temperature: {temperature}°C
Humidity: {humidity}%
Soil Moisture: {soil_moisture}%
Light Intensity: {light} lux

Provide actionable insights to maintain optimal plant growth. Consider user queries if provided. Answer just in Persian.
"""

prompt = PromptTemplate(input_variables=["temperature", "humidity", "soil_moisture", "light"], template=template)
