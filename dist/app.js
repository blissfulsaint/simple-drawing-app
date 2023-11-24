"use strict";
// app.ts
var DrawingApp = /** @class */ (function () {
    function DrawingApp() {
        this.isDrawing = false;
        this.canvas = document.getElementById('drawingCanvas');
        this.context = this.canvas.getContext('2d');
        this.setupEventListeners();
        this.setupGenerateArtButton();
        this.setupClearCanvasButton(); // Add this line
    }
    DrawingApp.prototype.setupEventListeners = function () {
        this.canvas.addEventListener('mousedown', this.startDrawing.bind(this));
        this.canvas.addEventListener('mousemove', this.draw.bind(this));
        this.canvas.addEventListener('mouseup', this.stopDrawing.bind(this));
        this.canvas.addEventListener('mouseout', this.stopDrawing.bind(this));
    };
    DrawingApp.prototype.setupGenerateArtButton = function () {
        var generateArtButton = document.createElement('button');
        generateArtButton.textContent = 'Generate Square';
        generateArtButton.addEventListener('click', this.generateRecursiveArt.bind(this));
        document.body.appendChild(generateArtButton);
    };
    DrawingApp.prototype.setupClearCanvasButton = function () {
        var clearCanvasButton = document.createElement('button');
        clearCanvasButton.textContent = 'Clear Canvas';
        clearCanvasButton.addEventListener('click', this.clearCanvas.bind(this));
        document.body.appendChild(clearCanvasButton);
    };
    DrawingApp.prototype.startDrawing = function (event) {
        this.isDrawing = true;
        this.draw(event);
    };
    DrawingApp.prototype.draw = function (event) {
        if (!this.isDrawing)
            return;
        this.context.lineWidth = 5;
        this.context.lineCap = 'round';
        this.context.strokeStyle = '#000';
        this.context.lineTo(event.clientX - this.canvas.offsetLeft, event.clientY - this.canvas.offsetTop);
        this.context.stroke();
        this.context.beginPath();
        this.context.moveTo(event.clientX - this.canvas.offsetLeft, event.clientY - this.canvas.offsetTop);
    };
    DrawingApp.prototype.stopDrawing = function () {
        this.isDrawing = false;
        this.context.beginPath();
    };
    DrawingApp.prototype.generateRecursiveArt = function () {
        // Your recursive art generation logic goes here
        // For example, you can use the drawFractal function from the previous example
        this.drawFractal(50, 50, 200, 4);
    };
    DrawingApp.prototype.drawFractal = function (x, y, size, depth) {
        if (depth === 0) {
            return; // Base case
        }
        // Draw something at the current position
        this.context.fillRect(x, y, size, size);
        // Recursive calls for smaller iterations
        var newSize = size / 3;
        this.drawFractal(x, y, newSize, depth - 1); // Top-left
        this.drawFractal(x + 2 * newSize, y, newSize, depth - 1); // Top-right
        this.drawFractal(x, y + 2 * newSize, newSize, depth - 1); // Bottom-left
        this.drawFractal(x + 2 * newSize, y + 2 * newSize, newSize, depth - 1); // Bottom-right
    };
    DrawingApp.prototype.clearCanvas = function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };
    return DrawingApp;
}());
// Initialize the app
var drawingApp = new DrawingApp();
