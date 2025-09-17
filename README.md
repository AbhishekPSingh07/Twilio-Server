# Twilio Speech-to-Text Integration Server

A comprehensive real-time speech processing system that combines Twilio's voice communication services with Google Cloud Speech-to-Text API and an AI-powered chatbot assistant. This project enables intelligent voice interactions for appointment booking and customer service automation.

## 🚀 Features

- **Real-time Speech Recognition**: Integration with Google Cloud Speech-to-Text API
- **Twilio Voice Integration**: Handle incoming calls and stream audio data
- **AI-Powered Chatbot**: Neural network-based intent recognition and response system
- **Appointment Booking**: Automated scheduling system with slot management
- **WebSocket Communication**: Real-time bidirectional communication
- **Text-to-Speech**: Natural voice synthesis for responses
- **Multi-language Support**: Configurable language settings for speech recognition

## 📁 Project Structure

```
Twilio-Server/
├── Node_Server/                 # Express.js WebSocket server
│   ├── index.js                # Main server file with Twilio/Google integration
│   └── package.json            # Node.js dependencies
└── Model_Server/               # Python AI model server
    ├── main.py                 # Voice assistant main application
    ├── assistants.py           # Neural network chatbot implementation
    ├── training.py             # Model training script
    ├── intents.json            # Training data for chatbot intents
    ├── requirements.txt        # Python dependencies
    └── *.pkl/*.keras/*.h5      # Trained model files
```

## 🛠 Technologies Used

### Node.js Server
- **Express.js**: Web application framework
- **WebSocket (ws)**: Real-time communication
- **Google Cloud Speech**: Speech-to-text conversion
- **Twilio**: Voice communication platform

### Python AI Server
- **TensorFlow/Keras**: Neural network implementation
- **NLTK**: Natural language processing
- **AssemblyAI**: Speech transcription service
- **Flask**: Web framework for API endpoints
- **SpeechRecognition**: Audio input processing
- **TTS (Text-to-Speech)**: Voice synthesis

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Python (3.8 or higher)
- Google Cloud Speech API credentials
- Twilio account and phone number
- AssemblyAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Twilio-Server
   ```

2. **Set up Node.js Server**
   ```bash
   cd Node_Server
   npm install
   ```

3. **Set up Python Environment**
   ```bash
   cd ../Model_Server
   pip install -r requirements.txt
   ```

4. **Configure API Keys**
   - Add your Google Cloud Speech API credentials as `api_key.json` in the root directory
   - Update AssemblyAI API key in `main.py`
   - Configure Twilio webhook URLs

### Configuration

1. **Google Cloud Speech API**
   - Create a service account in Google Cloud Console
   - Download the JSON credentials file as `api_key.json`
   - Place it in the project root directory

2. **Twilio Setup**
   - Configure webhook URL to point to your server: `https://your-domain.com/`
   - Ensure your server is accessible from the internet (use ngrok for testing)

3. **Speech Recognition Settings**
   - Default encoding: MULAW
   - Sample rate: 8000 Hz
   - Language: English (en-GB)

## 🎯 Usage

### Starting the Servers

1. **Start Node.js WebSocket Server**
   ```bash
   cd Node_Server
   npm start
   ```
   Server will run on port 8080

2. **Start Python Voice Assistant**
   ```bash
   cd Model_Server
   python main.py
   ```

### Making a Call

1. Call your Twilio phone number
2. The system will automatically start streaming audio to Google Cloud Speech
3. Speak naturally - the AI assistant will process your requests
4. Available commands include:
   - Greetings: "Hello", "Hi", "Good morning"
   - Appointments: "Book a table", "Make a reservation", "Check available slots"
   - Say "STOP" to end the conversation

### Training the Model

To retrain the chatbot with new intents:

1. **Update intents.json** with new patterns and responses
2. **Run the training script**:
   ```bash
   python training.py
   ```
3. **Retrain the assistant model**:
   ```python
   # In your Python script
   assistant = BasicAssistant('./intents.json')
   assistant.fit_model(epochs=300)
   assistant.save_model()
   ```

## 📋 API Endpoints

### Node.js Server
- **POST /** - Twilio webhook endpoint for call handling
- **WebSocket Connection** - Real-time audio streaming

### Supported WebSocket Events
- `connected` - Initialize speech recognition stream
- `start` - Begin media streaming
- `media` - Process audio payload
- `stop` - End media stream and cleanup

## 🔧 Configuration Options

### Speech Recognition
```javascript
const request = {
    config: {
        encoding: "MULAW",
        sampleRateHertz: 8000,
        languageCode: "en-GB"
    },
    interimResults: true,
};
```

### Appointment System
- **Operating Hours**: 9 AM - 6 PM
- **Booking Slots**: Hourly intervals
- **Default Booked Slots**: 10 AM, 12 PM, 3 PM

## 🤖 AI Assistant Features

### Intent Recognition
The chatbot can handle multiple types of interactions:
- **Greetings**: Welcome messages and introductions
- **Reservations**: Appointment booking and slot checking
- **Farewells**: Conversation endings

### Method Mappings
Custom functions can be mapped to specific intents:
```python
assistant = BasicAssistant('./intents.json', method_mappings={
    "Reservation": empty_appointments
})
```

## 📊 Model Architecture

### Neural Network Structure
- **Input Layer**: Bag-of-words representation
- **Hidden Layers**: 
  - Dense layer (128 neurons, ReLU activation)
  - Dropout (0.5)
  - Dense layer (64 neurons, ReLU activation)
  - Dropout (0.5)
- **Output Layer**: Softmax activation for intent classification

### Training Data
- **Patterns**: User input examples for each intent
- **Responses**: Predefined responses for each intent category
- **Method Mappings**: Dynamic function calls for specific intents

## 🔍 Troubleshooting

### Common Issues

1. **WebSocket Connection Errors**
   - Ensure server is running on the correct port (8080)
   - Check firewall settings and network connectivity

2. **Speech Recognition Not Working**
   - Verify Google Cloud credentials are properly configured
   - Check audio encoding settings match Twilio's output

3. **Model Loading Errors**
   - Ensure all pickle files and model files are present
   - Run training.py to regenerate model files if needed

4. **Audio Quality Issues**
   - Adjust microphone sensitivity: `r.energy_threshold = 10000`
   - Fine-tune ambient noise adjustment: `r.adjust_for_ambient_noise(source, 0.2)`

## 📈 Performance Optimization

### Recommendations
- Use GPU acceleration for TensorFlow operations
- Implement connection pooling for database operations
- Cache frequently accessed model predictions
- Optimize audio buffer sizes for real-time processing

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
