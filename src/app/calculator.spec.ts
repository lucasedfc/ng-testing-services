import { Calculator } from './calculator';

describe('Test for Calculator', () => {
  describe('Multiply method', () => {
    it('#multiply should return a nine', () => {
      //Arrange
      const calculator = new Calculator();
      //Act
      const res = calculator.multiply(3, 3);
      //Assert
      expect(res).toEqual(9);
    });

    it('#multiply should return a four', () => {
      //Arrange
      const calculator = new Calculator();
      //Act
      const res = calculator.multiply(1, 4);
      //Assert
      expect(res).toEqual(4);
    });
  });

  describe('Divide method', () => {
    it('#divide should return three', () => {
      //Arrange
      const calculator = new Calculator();
      //Act
      const res = calculator.divide(9, 3);

      //Assert
      expect(res).toEqual(3);
    });

    it('#divide should return a null', () => {
      //Arrange
      const calculator = new Calculator();
      //Actert
      expect(calculator.divide(5, 0)).toBeNull();
    });
  });

  describe('Differents matchers', () => {
    it('#test matchers', () => {
      const name = 'luke';
      let name2;

      expect(name).toBeDefined();
      expect(name2).toBeUndefined();

      expect(1 + 3 === 4).toBeTruthy();
      expect(1 + 1 === 3).toBeFalsy();

      expect(5).toBeLessThan(10);
      expect(20).toBeGreaterThan(10);

      expect('123456').toMatch(/123/);

      expect(['apples', 'oranges', 'pears']).toContain('oranges');
    });
  });
});
