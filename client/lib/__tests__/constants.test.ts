/**
 * Tests for constants
 */

import { CATEGORIES, BENEFITS, TESTIMONIALS, HOW_IT_WORKS_STEPS, TRUST_FEATURES } from '../constants';

describe('Constants', () => {
  describe('CATEGORIES', () => {
    it('has 4 categories', () => {
      expect(CATEGORIES).toHaveLength(4);
    });

    it('all categories have required fields', () => {
      CATEGORIES.forEach((category) => {
        expect(category).toHaveProperty('key');
        expect(category).toHaveProperty('title');
        expect(category).toHaveProperty('slug');
        expect(category).toHaveProperty('icon');
        expect(category).toHaveProperty('description');
        expect(category).toHaveProperty('color');
      });
    });

    it('has unique keys', () => {
      const keys = CATEGORIES.map((c) => c.key);
      const uniqueKeys = new Set(keys);
      expect(uniqueKeys.size).toBe(keys.length);
    });
  });

  describe('BENEFITS', () => {
    it('has 4 benefits', () => {
      expect(BENEFITS).toHaveLength(4);
    });

    it('all benefits have required fields', () => {
      BENEFITS.forEach((benefit) => {
        expect(benefit).toHaveProperty('title');
        expect(benefit).toHaveProperty('description');
        expect(benefit).toHaveProperty('icon');
        expect(benefit).toHaveProperty('details');
        expect(Array.isArray(benefit.details)).toBe(true);
      });
    });

    it('all benefits have at least 3 details', () => {
      BENEFITS.forEach((benefit) => {
        expect(benefit.details.length).toBeGreaterThanOrEqual(3);
      });
    });
  });

  describe('TESTIMONIALS', () => {
    it('has at least 5 testimonials', () => {
      expect(TESTIMONIALS.length).toBeGreaterThanOrEqual(5);
    });

    it('all testimonials have required fields', () => {
      TESTIMONIALS.forEach((testimonial) => {
        expect(testimonial).toHaveProperty('author');
        expect(testimonial).toHaveProperty('text');
        expect(testimonial).toHaveProperty('rating');
      });
    });

    it('all ratings are between 0 and 5', () => {
      TESTIMONIALS.forEach((testimonial) => {
        expect(testimonial.rating).toBeGreaterThanOrEqual(0);
        expect(testimonial.rating).toBeLessThanOrEqual(5);
      });
    });
  });

  describe('HOW_IT_WORKS_STEPS', () => {
    it('has 3 steps', () => {
      expect(HOW_IT_WORKS_STEPS).toHaveLength(3);
    });

    it('all steps are non-empty strings', () => {
      HOW_IT_WORKS_STEPS.forEach((step) => {
        expect(typeof step).toBe('string');
        expect(step.length).toBeGreaterThan(0);
      });
    });
  });

  describe('TRUST_FEATURES', () => {
    it('has 3 features', () => {
      expect(TRUST_FEATURES).toHaveLength(3);
    });

    it('all features are non-empty strings', () => {
      TRUST_FEATURES.forEach((feature) => {
        expect(typeof feature).toBe('string');
        expect(feature.length).toBeGreaterThan(0);
      });
    });
  });
});

