document.addEventListener('DOMContentLoaded', () => {
    const hexInput = document.querySelector('input[placeholder="Hex"]') as HTMLInputElement;
    const rgbInput = document.querySelector('input[placeholder="RGB"]') as HTMLInputElement;
    const hslInput = document.querySelector('input[placeholder="HSL"]') as HTMLInputElement;

    // Helper functions for color conversion
    function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
        const cleanHex = hex.replace(/^#/, '');
        if (!/^[0-9A-Fa-f]{6}$/.test(cleanHex)) return null;

        const r = parseInt(cleanHex.substring(0, 2), 16);
        const g = parseInt(cleanHex.substring(2, 4), 16);
        const b = parseInt(cleanHex.substring(4, 6), 16);
        return {r, g, b};
    }

    function rgbToHex(r: number, g: number, b: number): string {
        const toHex = (n: number) => {
            const hex = Math.max(0, Math.min(255, n)).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }

    function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
        r /= 255;
        g /= 255;
        b /= 255;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h: number, s: number, l: number = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
                default:
                    h = 0;
            }
            h /= 6;
        }
        return {h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100)};
    }

    function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
        h /= 360;
        s /= 100;
        l /= 100;
        let r: number, g: number, b: number;

        if (s === 0) {
            r = g = b = l;
        } else {
            const hue2rgb = (p: number, q: number, t: number): number => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }
        return {
            r: Math.round(r * 255),
            g: Math.round(g * 255),
            b: Math.round(b * 255)
        };
    }

    // Input validation and formatting
    function isValidRgb(rgb: string): boolean {
        const match = rgb.match(/^(\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})$/);
        if (!match) return false;
        const [_, r, g, b] = match;
        return [r, g, b].every(n => parseInt(n) >= 0 && parseInt(n) <= 255);
    }

    function isValidHsl(hsl: string): boolean {
        const match = hsl.match(/^(\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%$/);
        if (!match) return false;
        const [_, h, s, l] = match;
        return parseInt(h) <= 360 && parseInt(s) <= 100 && parseInt(l) <= 100;
    }

    // Event listeners for real-time conversion
    hexInput.addEventListener('input', () => {
        const hex = hexInput.value.trim();
        if (!hex) {
            rgbInput.value = '';
            hslInput.value = '';
            return;
        }

        const rgb = hexToRgb(hex);
        if (rgb) {
            rgbInput.value = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
            const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
            hslInput.value = `${hsl.h}, ${hsl.s}%, ${hsl.l}%`;
        } else {
            rgbInput.value = 'Invalid Hex';
            hslInput.value = 'Invalid Hex';
        }
    });

    rgbInput.addEventListener('input', () => {
        const rgb = rgbInput.value.trim();
        if (!rgb) {
            hexInput.value = '';
            hslInput.value = '';
            return;
        }

        if (isValidRgb(rgb)) {
            const [r, g, b] = rgb.split(',').map(n => parseInt(n.trim()));
            hexInput.value = rgbToHex(r, g, b);
            const hsl = rgbToHsl(r, g, b);
            hslInput.value = `${hsl.h}, ${hsl.s}%, ${hsl.l}%`;
        } else {
            hexInput.value = 'Invalid RGB';
            hslInput.value = 'Invalid RGB';
        }
    });

    hslInput.addEventListener('input', () => {
        const hsl = hslInput.value.trim();
        if (!hsl) {
            hexInput.value = '';
            rgbInput.value = '';
            return;
        }

        if (isValidHsl(hsl)) {
            const [h, s, l] = hsl.replace(/%/g, '').split(',').map(n => parseInt(n.trim()));
            const rgb = hslToRgb(h, s, l);
            rgbInput.value = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
            hexInput.value = rgbToHex(rgb.r, rgb.g, rgb.b);
        } else {
            hexInput.value = 'Invalid HSL';
            rgbInput.value = 'Invalid HSL';
        }
    });

    // Select all copy icons
    const copyIcons = document.querySelectorAll('.copy-icon');

    copyIcons.forEach(icon => {
        // @ts-ignore
        icon.addEventListener('click', async () => {
            // Get the target input ID from data-target attribute
            const targetInputId = icon.getAttribute('data-target');
            const input = document.getElementById(targetInputId) as HTMLInputElement;

            if (input && input.value) {
                const originalPlaceholder = input.placeholder;
                const originalValue = input.value;
                try {
                    // Copy the input value to clipboard
                    await navigator.clipboard.writeText(originalValue);

                    // Optional: Provide visual feedback
                    input.value = ''; // Clear input temporarily
                    input.placeholder = 'Copied!';
                    input.classList.add('is-success');
                    setTimeout(() => {
                        input.placeholder = originalPlaceholder;
                        input.value = originalValue;
                        input.classList.remove('is-success');
                    }, 1000); // Reset placeholder after 1 second
                } catch (err) {
                    console.error('Failed to copy: ', err);
                    // Optional: Show error feedback
                    input.placeholder = 'Copy failed!';
                    setTimeout(() => {
                        input.placeholder = originalPlaceholder;
                    }, 1000);
                }
            }
        });
    });
});