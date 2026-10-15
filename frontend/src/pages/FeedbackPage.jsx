// FeedbackPage Component - Community Discovery & Feedback Hub (Assignments 7 & 14)
import React from 'react';
import FeedbackForm from '../components/FeedbackForm';
import { MessageSquare, Database, ExternalLink, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function FeedbackPage() {
  return (
    <div className="section" style={{ background: '#FAF7F2', minHeight: '85vh', padding: '50px 0 80px 0' }}>
      <div className="container" style={{ maxWidth: 840 }}>
        {/* Section Header */}
        <div className="section-header" style={{ textAlign: 'center', marginBottom: 36 }}>
          <span className="section-subtitle">COMMUNITY VOICES & SUGGESTIONS</span>
          <h1 className="section-title" style={{ fontSize: '2.5rem', marginTop: 8 }}>
            Community Feedback
          </h1>
          <p className="section-description" style={{ maxWidth: 640, margin: '10px auto 0' }}>
            Have a favorite misal spot, an undiscovered trekking viewpoint, or historical insights? Share your experiences and help fellow travelers explore the authentic soul of Nashik.
          </p>
        </div>

        {/* Feedback Form Card */}
        <div style={{ marginBottom: 40 }}>
          <FeedbackForm />
        </div>

        {/* Admin / Academic Demonstration Banner */}
        <div
          style={{
            background: 'white',
            borderRadius: 16,
            padding: '24px 28px',
            border: '1px solid #EAE5D9',
            boxShadow: '0 4px 14px rgba(0,0,0,0.04)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 20,
            flexWrap: 'wrap'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: 'rgba(217, 119, 6, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-primary)',
                flexShrink: 0
              }}
            >
              <Database size={22} />
            </div>
            <div>
              <h4 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--color-primary)' }}>
                Live Database Responses Viewer (Admin Table)
              </h4>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#718096' }}>
                For evaluators & academic review: inspect submitted responses stored in MySQL/Node backend with live delete actions.
              </p>
            </div>
          </div>

          <a
            href="http://localhost:5001/admin/feedback"
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
            style={{ textDecoration: 'none', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.88rem' }}
          >
            <Database size={15} />
            Open Responses Viewer <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}
