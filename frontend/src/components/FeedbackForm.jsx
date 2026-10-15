// FeedbackForm Component (Assignment 7 & 14)
import React, { useState } from 'react';
import { Star, Send, CheckCircle2, AlertCircle, Database, ExternalLink } from 'lucide-react';
import { submitFeedbackApi } from '../services/api';

export default function FeedbackForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    favorite_place: 'Pandavleni Caves',
    rating: 5,
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      errs.message = 'Feedback message is required';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters long';
    } else if (formData.message.length > 500) {
      errs.message = 'Message must not exceed 500 characters';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      await submitFeedbackApi(formData);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', favorite_place: 'Pandavleni Caves', rating: 5, message: '' });
      setErrors({});
    } catch (err) {
      alert('Failed to send feedback. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ background: 'white', borderRadius: 20, padding: 36, boxShadow: 'var(--shadow-lg)', border: '1px solid var(--color-border)', maxWidth: 680, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 20 }}>
        <div style={{ flex: '1 1 300px' }}>
          <h3 style={{ fontSize: '1.6rem', color: 'var(--color-primary)', marginBottom: 6 }}>Share Your Nashik Discovery Experience</h3>
          <p style={{ color: '#718096', margin: 0, fontSize: '0.95rem' }}>
            Help us expand our guide with your personal observations and favorite spots across Nashik.
          </p>
        </div>
        <a
          href="http://localhost:5001/admin/feedback"
          target="_blank"
          rel="noreferrer"
          title="Open live feedback database table"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '8px 14px',
            borderRadius: 8,
            background: 'rgba(168, 67, 36, 0.08)',
            border: '1px solid var(--color-primary)',
            color: 'var(--color-primary)',
            fontSize: '0.85rem',
            fontWeight: 600,
            textDecoration: 'none',
            whiteSpace: 'nowrap'
          }}
        >
          <Database size={15} />
          View All Responses <ExternalLink size={13} />
        </a>
      </div>

      {isSubmitted ? (
        <div style={{ background: '#C6F6D5', color: '#22543D', padding: 24, borderRadius: 12, textAlign: 'center' }}>
          <CheckCircle2 style={{ width: 44, height: 44, margin: '0 auto 12px auto' }} />
          <h4 style={{ margin: '0 0 4px 0', fontSize: '1.2rem' }}>Thank You for Your Feedback!</h4>
          <p style={{ margin: 0, fontSize: '0.9rem' }}>Your insights have been successfully submitted to the database.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 18, flexWrap: 'wrap' }}>
            <button className="btn btn-outline" onClick={() => setIsSubmitted(false)}>
              Submit Another Response
            </button>
            <a
              href="http://localhost:5001/admin/feedback"
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
              style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}
            >
              <Database size={16} />
              View Your Submitted Response <ExternalLink size={14} />
            </a>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', marginBottom: 6 }}>Full Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{ width: '100%', padding: '12px 14px', borderRadius: 8, border: errors.name ? '1px solid #E53E3E' : '1px solid #CBD5E0', fontSize: '0.95rem' }}
              placeholder="e.g. Tanvi Pagare"
            />
            {errors.name && <span style={{ color: '#E53E3E', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}><AlertCircle size={12} /> {errors.name}</span>}
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', marginBottom: 6 }}>Email Address *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={{ width: '100%', padding: '12px 14px', borderRadius: 8, border: errors.email ? '1px solid #E53E3E' : '1px solid #CBD5E0', fontSize: '0.95rem' }}
              placeholder="e.g. tanvi@example.com"
            />
            {errors.email && <span style={{ color: '#E53E3E', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}><AlertCircle size={12} /> {errors.email}</span>}
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', marginBottom: 6 }}>Favorite Nashik Place</label>
            <select
              value={formData.favorite_place}
              onChange={(e) => setFormData({ ...formData, favorite_place: e.target.value })}
              style={{ width: '100%', padding: '12px 14px', borderRadius: 8, border: '1px solid #CBD5E0', fontSize: '0.95rem', background: 'white' }}
            >
              <option value="Pandavleni Caves">Pandavleni Caves</option>
              <option value="Trimbakeshwar Temple">Trimbakeshwar Temple</option>
              <option value="Sula Vineyards">Sula Vineyards</option>
              <option value="Ram Kund">Ram Kund</option>
              <option value="Anjaneri Hills">Anjaneri Hills</option>
              <option value="Coin Museum">Coin Museum</option>
              <option value="Someshwar Waterfall">Someshwar Waterfall</option>
            </select>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', marginBottom: 6 }}>Overall Rating</label>
            <div style={{ display: 'flex', gap: 8 }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setFormData({ ...formData, rating: star })}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
                >
                  <Star style={{ width: 24, height: 24, fill: star <= formData.rating ? '#D4A359' : 'none', color: '#D4A359' }} />
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', marginBottom: 6 }}>Feedback / Story *</label>
            <textarea
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              style={{ width: '100%', padding: '12px 14px', borderRadius: 8, border: errors.message ? '1px solid #E53E3E' : '1px solid #CBD5E0', fontSize: '0.95rem' }}
              placeholder="What unique historical spot or food did you enjoy in Nashik?"
            />
            {errors.message && <span style={{ color: '#E53E3E', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}><AlertCircle size={12} /> {errors.message}</span>}
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={submitting}>
            <Send style={{ width: 18, height: 18 }} />
            {submitting ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </form>
      )}
    </div>
  );
}
