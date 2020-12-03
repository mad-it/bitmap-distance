import { bitmapDistance } from '../src/index';
import readlineSync from 'readline-sync';

jest.mock('readline-sync')

// Happy paths
describe('bitmapDistance', () => {
    beforeEach(() => {
        // Happy path, overwrite for testing errors.
        jest.spyOn(readlineSync, 'questionInt').mockImplementationOnce(() => 1);
        jest.spyOn(readlineSync, 'question')
            .mockImplementationOnce(() => '2 3')
            .mockImplementationOnce(() => '000')
            .mockImplementationOnce(() => '010');
    });

    afterEach(() => {
        jest.resetAllMocks()
        // jest.clearAllMocks();
    });

    // describe('happy paths', () => {

    // });

    describe('input validation', () => {
        describe('test cases input', () => {
            it('reads integer from standard input', () => {
                bitmapDistance();
                expect(readlineSync.questionInt).toHaveBeenCalled();
            });

            it('validates input range', () => {
                jest.spyOn(readlineSync, 'questionInt').mockImplementationOnce(() => 1001);
                bitmapDistance();

                expect(bitmapDistance).toThrowError('Number of test cases must be between 1 and 1000.');
            });
        });

        describe('size of bitmap input', () => {
            it('reads string from standard input', () => {
                bitmapDistance();
                expect(readlineSync.question).toHaveBeenCalled();
            });

            it('validates input range', () => {
                jest.spyOn(readlineSync, 'questionInt').mockImplementationOnce(() => 1);
                jest.spyOn(readlineSync, 'question')
                    .mockImplementationOnce(() => '183 0')
                    .mockImplementationOnce(() => '000')
                    .mockImplementationOnce(() => '010');

                bitmapDistance();
                expect(bitmapDistance).toThrowError('Invalid size of the bitmap.');
            });
        });

        describe('rows input', () => {
            it('reads rows from standard input', () => {
                bitmapDistance();
                // n = 2, m = 3
                expect(readlineSync.question).toHaveBeenCalledTimes(3);
            });

            it('validates row range', () => {
                jest.spyOn(readlineSync, 'questionInt').mockImplementationOnce(() => 1);
                jest.spyOn(readlineSync, 'question')
                    .mockImplementationOnce(() => '2 3')
                    .mockImplementationOnce(() => '0000') // Send 4 columns instead of 3
                    .mockImplementationOnce(() => '0100');

                bitmapDistance();
                expect(bitmapDistance).toThrowError(`Row should contain 3 columns.`);
            });

            it('validates row values', () => {
                jest.spyOn(readlineSync, 'questionInt').mockImplementationOnce(() => 1);
                jest.spyOn(readlineSync, 'question')
                    .mockImplementationOnce(() => '2 3')
                    .mockImplementationOnce(() => '123')
                    .mockImplementationOnce(() => '456');

                bitmapDistance();
                expect(bitmapDistance).toThrowError(`Row should contain only 0 or 1 values.`);
            });
        });
    });
});