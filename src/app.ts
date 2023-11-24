// app.ts
class DrawingApp {
	private canvas: HTMLCanvasElement;
	private context: CanvasRenderingContext2D;
	private isDrawing: boolean = false;

	constructor() {
		this.canvas = document.getElementById('drawingCanvas') as HTMLCanvasElement;
		this.context = this.canvas.getContext('2d')!;
		this.setupEventListeners();
		this.setupGenerateArtButton();
		this.setupClearCanvasButton(); // Add this line
	}

	private setupEventListeners() {
		this.canvas.addEventListener('mousedown', this.startDrawing.bind(this));
		this.canvas.addEventListener('mousemove', this.draw.bind(this));
		this.canvas.addEventListener('mouseup', this.stopDrawing.bind(this));
		this.canvas.addEventListener('mouseout', this.stopDrawing.bind(this));
	}

	private setupGenerateArtButton() {
		const generateArtButton = document.createElement('button');
		generateArtButton.textContent = 'Generate Square';
		generateArtButton.addEventListener('click', this.generateRecursiveArt.bind(this));
		document.body.appendChild(generateArtButton);
	}

	private setupClearCanvasButton() {
		const clearCanvasButton = document.createElement('button');
		clearCanvasButton.textContent = 'Clear Canvas';
		clearCanvasButton.addEventListener('click', this.clearCanvas.bind(this));
		document.body.appendChild(clearCanvasButton);
	}

	private startDrawing(event: MouseEvent) {
		this.isDrawing = true;
		this.draw(event);
	}

	private draw(event: MouseEvent) {
		if (!this.isDrawing) return;

		this.context.lineWidth = 5;
		this.context.lineCap = 'round';
		this.context.strokeStyle = '#000';

		this.context.lineTo(event.clientX - this.canvas.offsetLeft, event.clientY - this.canvas.offsetTop);
		this.context.stroke();
		this.context.beginPath();
		this.context.moveTo(event.clientX - this.canvas.offsetLeft, event.clientY - this.canvas.offsetTop);
	}

	private stopDrawing() {
		this.isDrawing = false;
		this.context.beginPath();
	}

	private generateRecursiveArt() {
		// Your recursive art generation logic goes here
		// For example, you can use the drawFractal function from the previous example
		this.drawFractal(50, 50, 200, 4);
	}

	private drawFractal(x: number, y: number, size: number, depth: number) {
		if (depth === 0) {
			return; // Base case
		}

		// Draw something at the current position
		this.context.fillRect(x, y, size, size);

		// Recursive calls for smaller iterations
		const newSize = size / 3;

		this.drawFractal(x, y, newSize, depth - 1); // Top-left
		this.drawFractal(x + 2 * newSize, y, newSize, depth - 1); // Top-right
		this.drawFractal(x, y + 2 * newSize, newSize, depth - 1); // Bottom-left
		this.drawFractal(x + 2 * newSize, y + 2 * newSize, newSize, depth - 1); // Bottom-right
	}

	private clearCanvas() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}

// Initialize the app
const drawingApp = new DrawingApp();
