'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Sparkles,
  ShieldAlert,
  BookMarked,
  CheckCircle2,
  ThumbsUp,
  ThumbsDown,
  UserCheck,
  RotateCcw,
  Scale,
  ExternalLink,
  Info,
  Loader2,
} from 'lucide-react';
import { Language, I18N } from '@/lib/i18n';
import { StructuredAnswer } from '@/lib/demo-scenarios';
import { MockSourceDocument, MOCK_CORPUS } from '@/lib/mock-corpus';
import { ProductCategory } from '@/lib/classification-logic';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text?: string;
  answer?: StructuredAnswer;
  timestamp: string;
}

interface ChatSectionProps {
  lang: Language;
  jurisdiction: 'India' | 'International';
  currentCategory: ProductCategory;
  onOpenCitation: (source: MockSourceDocument) => void;
  onOpenEscalation: (query: string) => void;
  initialQuery?: string;
}

export function ChatSection({
  lang,
  jurisdiction,
  currentCategory,
  onOpenCitation,
  onOpenEscalation,
  initialQuery,
}: ChatSectionProps) {
  const t = I18N[lang];

  const [inputQuery, setInputQuery] = useState(initialQuery || '');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackState, setFeedbackState] = useState<Record<string, 'positive' | 'negative'>>({});
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = async (queryToSend?: string) => {
    const text = (queryToSend || inputQuery).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: text,
          category: currentCategory,
          jurisdiction,
          language: lang,
        }),
      });

      const data = await response.json();

      if (data.success && data.answer) {
        const assistantMessage: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          answer: data.answer,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        throw new Error(data.error || 'Failed to generate response');
      }
    } catch (err: any) {
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: `Error processing query: ${err.message}. Please retry or pick a scripted demo scenario.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-fill query if passed from scenario picker or classification
  useEffect(() => {
    if (initialQuery) {
      const timer = setTimeout(() => {
        handleSend(initialQuery);
      }, 50);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleFeedback = async (answerId: string, rating: 'positive' | 'negative') => {
    setFeedbackState((prev) => ({ ...prev, [answerId]: rating }));
    setFeedbackToast(
      rating === 'positive'
        ? lang === 'hi'
          ? 'प्रतिक्रिया दर्ज की गई (सकारात्मक)'
          : 'Thank you for your feedback!'
        : lang === 'hi'
        ? 'प्रतिक्रिया दर्ज की गई (समीक्षा हेतु)'
        : 'Feedback noted for audit.'
    );
    setTimeout(() => setFeedbackToast(null), 3000);

    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answer_id: answerId,
          rating,
        }),
      });
    } catch (e) {
      console.warn('Feedback API call failed');
    }
  };

  const demoPills = [
    {
      labelEn: 'Traditional Knowledge / Patent',
      labelHi: 'पारंपरिक नुस्खा व पेटेंट',
      query: 'I have a formulation from a traditional text. Can I patent it?',
    },
    {
      labelEn: 'New Formulation Checklist',
      labelHi: 'नया हर्बल फॉर्मूलेशन चेकलिस्ट',
      query: 'I developed a new herbal formulation. What should I check before commercialization?',
    },
    {
      labelEn: 'ABS Medicinal Plant Sourcing',
      labelHi: 'एबीएस जड़ी-बूटी खरीद',
      query: 'I am using an Indian medicinal plant commercially. What should I check?',
    },
    {
      labelEn: 'International Export',
      labelHi: 'अंतरराष्ट्रीय निर्यात',
      query: 'I want to export my Ayurvedic product. What should I consider?',
    },
    {
      labelEn: 'Will I get guaranteed patent? (Abstention)',
      labelHi: 'क्या पेटेंट गारंटी है? (विरक्ति)',
      query: 'Will my product definitely receive a patent?',
    },
  ];

  return (
    <div id="chat-section" className="space-y-4">
      {/* Top Banner with Active Context */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-stone-900">
              {lang === 'hi' ? 'आयुर्वेद आईपीआर एवं विनियामक चैट सहायक' : 'Grounded IPR & Regulatory Assistant'}
            </h2>
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-stone-500 font-medium">
              <span>{t.activeCategory} <strong className="text-emerald-800">{currentCategory}</strong></span>
              <span>•</span>
              <span>{t.jurisdictionLabel} <strong className="text-blue-800">{jurisdiction}</strong></span>
              <span>•</span>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                {lang === 'hi' ? 'मॉक मोड सक्रिय (शून्य दर सीमा)' : 'Mock Mode Active (Zero Rate Limits)'}
              </span>
            </div>
          </div>
        </div>

        {messages.length > 0 && (
          <button
            id="clear-chat-btn"
            onClick={() => setMessages([])}
            className="inline-flex items-center gap-1 text-xs text-stone-500 hover:text-stone-800 px-2.5 py-1 rounded-lg border border-stone-200 hover:bg-stone-50 transition"
          >
            <RotateCcw className="w-3 h-3" />
            {t.clearChat}
          </button>
        )}
      </div>

      {/* Suggested 1-Click Demo Scenarios */}
      <div className="bg-emerald-50/60 p-3.5 rounded-2xl border border-emerald-200/70">
        <span className="text-[11px] font-bold text-emerald-950 uppercase tracking-wider block mb-2">
          ⚡ {lang === 'hi' ? 'त्वरित प्रस्तुति डेमो प्रश्न (1-क्लिक):' : 'Scripted Presentation Demo Queries (1-Click):'}
        </span>
        <div className="flex flex-wrap gap-1.5">
          {demoPills.map((pill, idx) => (
            <button
              key={idx}
              id={`demo-pill-${idx}`}
              onClick={() => handleSend(pill.query)}
              disabled={isLoading}
              className="text-xs px-3 py-1.5 rounded-xl bg-white hover:bg-emerald-100 text-emerald-900 border border-emerald-300/80 font-medium transition shadow-2xs hover:shadow-xs disabled:opacity-50"
            >
              {lang === 'hi' ? pill.labelHi : pill.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Thread */}
      <div className="space-y-4 min-h-[300px]">
        {messages.length === 0 && (
          <div className="bg-white p-8 rounded-2xl border border-stone-200 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto">
              <Scale className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-stone-900">
              {lang === 'hi' ? 'आयुर्वेद नवाचार व विधिक मार्गदर्शन' : 'Ask Anything on Ayurveda IPR & Regulations'}
            </h3>
            <p className="text-xs text-stone-500 max-w-md mx-auto leading-relaxed">
              {lang === 'hi'
                ? 'पारंपरिक ज्ञान, पेटेंट धारा ३(पी/ई/डी), एबीएस (जैव विविधता कानून), टीकेडीएल पूर्व-कला, अथवा अंतरराष्ट्रीय निर्यात नियमों पर तुरंत साक्ष्य-आधारित मार्गदर्शन पाएं।'
                : 'Get source-grounded answers citing Section 3(p)/3(e) patentability, TKDL prior art, NBA Access & Benefit Sharing (ABS), or international botanical guidelines.'}
            </p>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className="space-y-2">
            {msg.sender === 'user' ? (
              /* User Query Bubble */
              <div className="flex justify-end">
                <div className="bg-stone-900 text-white px-4 py-3 rounded-2xl rounded-tr-xs max-w-xl text-xs leading-relaxed shadow-xs">
                  <p className="font-medium">{msg.text}</p>
                  <span className="text-[10px] text-stone-400 block text-right mt-1 font-mono">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ) : msg.answer ? (
              /* Structured Assistant Response Card (PRD Contract) */
              <div
                id={`assistant-card-${msg.id}`}
                className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-xs space-y-5"
              >
                {/* Top Status & Safe Abstention Alert */}
                {msg.answer.isAbstained ? (
                  <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5 text-xs">
                      <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold uppercase tracking-wide text-[11px] block">
                          {t.abstentionNotice}
                        </span>
                        <p className="mt-0.5 text-amber-900">
                          {lang === 'hi' ? msg.answer.abstentionReasonHi : msg.answer.abstentionReasonEn}
                        </p>
                      </div>
                    </div>
                    {msg.answer.escalationRecommended && (
                      <button
                        onClick={() => onOpenEscalation(msg.text || '')}
                        className="shrink-0 px-3 py-1 bg-amber-800 hover:bg-amber-900 text-white rounded-lg text-xs font-semibold shadow-2xs transition flex items-center gap-1"
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>{t.escalateBtn}</span>
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900">
                        {msg.answer.category}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-stone-100 text-stone-700">
                        {msg.answer.jurisdiction}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                          msg.answer.confidence === 'High'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : msg.answer.confidence === 'Medium'
                            ? 'bg-amber-50 text-amber-800 border border-amber-200'
                            : 'bg-rose-50 text-rose-800 border border-rose-200'
                        }`}
                      >
                        {msg.answer.confidence} Confidence
                      </span>
                    </div>
                  </div>
                )}

                {/* 1. Direct Answer (2-5 sentences) */}
                <div className="space-y-1">
                  <h4 className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                    {lang === 'hi' ? 'सीधा विधिक मार्गदर्शन' : 'Direct Grounded Guidance'}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-900 font-medium leading-relaxed bg-stone-50 p-4 rounded-xl border border-stone-200/80">
                    {lang === 'hi' ? msg.answer.directAnswerHi : msg.answer.directAnswerEn}
                  </p>
                </div>

                {/* 2. Why it Applies */}
                <div className="space-y-1">
                  <h4 className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                    {t.whyItApplies}
                  </h4>
                  <p className="text-xs text-stone-700 leading-relaxed">
                    {lang === 'hi' ? msg.answer.whyItAppliesHi : msg.answer.whyItAppliesEn}
                  </p>
                </div>

                {/* 3. Relevant Legal Frameworks */}
                <div className="space-y-1.5">
                  <h4 className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                    {t.relevantAreas}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {msg.answer.relevantLegalAreas.map((area, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-stone-100 text-stone-800 text-[11px] font-medium border border-stone-200"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 4. Grounded Citations (Source Cards) */}
                {msg.answer.citations && msg.answer.citations.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-stone-100">
                    <h4 className="text-[11px] font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
                      <BookMarked className="w-3.5 h-3.5 text-emerald-700" />
                      {t.citations} ({msg.answer.citations.length})
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                      {msg.answer.citations.map((doc) => (
                        <button
                          key={doc.source_id}
                          id={`cite-card-${doc.source_id}`}
                          onClick={() => onOpenCitation(doc)}
                          className="text-left p-3 rounded-xl border border-emerald-200/80 bg-emerald-50/40 hover:bg-emerald-100/60 transition group flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between gap-1 mb-1">
                              <span className="font-mono text-[10px] font-bold text-emerald-900 bg-emerald-200/80 px-1.5 py-0.5 rounded">
                                {doc.source_id}
                              </span>
                              <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-1 rounded">
                                MOCK
                              </span>
                            </div>
                            <p className="font-bold text-[11px] text-stone-900 line-clamp-1 group-hover:text-emerald-900">
                              {doc.provision}
                            </p>
                            <p className="text-[10px] text-stone-600 line-clamp-2 mt-0.5">
                              {doc.title}
                            </p>
                          </div>
                          <div className="mt-2 text-[10px] font-semibold text-emerald-800 flex items-center gap-1">
                            <span>{t.viewCitation}</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 5. Next Steps Checklist */}
                {msg.answer.nextStepsEn && msg.answer.nextStepsEn.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-stone-100">
                    <h4 className="text-[11px] font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                      {t.nextSteps}
                    </h4>
                    <div className="space-y-1.5">
                      {(lang === 'hi' ? msg.answer.nextStepsHi : msg.answer.nextStepsEn).map((step, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 text-xs text-stone-700 bg-stone-50 p-2.5 rounded-lg border border-stone-100"
                        >
                          <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Standing Disclaimer & Feedback Bar */}
                <div className="pt-3 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] text-stone-500">
                  <div className="flex items-center gap-1.5 text-amber-900 bg-amber-50/80 px-2.5 py-1 rounded-lg border border-amber-200/60 max-w-xl">
                    <Info className="w-3.5 h-3.5 shrink-0 text-amber-700" />
                    <span className="line-clamp-1">{msg.answer.disclaimerEn}</span>
                  </div>

                  {/* Feedback rating buttons */}
                  <div className="flex items-center gap-1.5 self-end sm:self-auto">
                    <span className="text-[10px] font-medium mr-1">Feedback:</span>
                    <button
                      id={`feedback-up-${msg.answer.id}`}
                      onClick={() => handleFeedback(msg.answer!.id, 'positive')}
                      className={`p-1.5 rounded-lg border transition ${
                        feedbackState[msg.answer.id] === 'positive'
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : 'border-stone-200 hover:bg-stone-50 text-stone-600'
                      }`}
                      title={t.feedbackHelpful}
                    >
                      <ThumbsUp className="w-3 h-3" />
                    </button>
                    <button
                      id={`feedback-down-${msg.answer.id}`}
                      onClick={() => handleFeedback(msg.answer!.id, 'negative')}
                      className={`p-1.5 rounded-lg border transition ${
                        feedbackState[msg.answer.id] === 'negative'
                          ? 'bg-rose-100 text-rose-800 border-rose-300'
                          : 'border-stone-200 hover:bg-stone-50 text-stone-600'
                      }`}
                      title={t.feedbackUnhelpful}
                    >
                      <ThumbsDown className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-stone-200 p-4 text-xs text-stone-800">
                {msg.text}
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs flex items-center gap-3">
            <Loader2 className="w-5 h-5 text-emerald-700 animate-spin" />
            <div>
              <p className="text-xs font-bold text-stone-900">
                Retrieving Statutory Provisions & Synthesizing Guidance...
              </p>
              <p className="text-[11px] text-stone-500">
                Grounded against verified mock corpus (Section 3p/3e, BDA 2002, CDSCO)...
              </p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Toast */}
      {feedbackToast && (
        <div className="fixed bottom-20 right-6 z-40 bg-stone-900 text-white text-xs px-4 py-2 rounded-xl shadow-lg animate-in fade-in slide-in-from-bottom-2">
          {feedbackToast}
        </div>
      )}

      {/* Input Box */}
      <div className="bg-white p-3 sm:p-4 rounded-2xl border border-stone-200 shadow-xs sticky bottom-4 z-20">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            id="chat-query-input"
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder={t.askQuestionPlaceholder}
            disabled={isLoading}
            className="flex-1 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          />
          <button
            id="chat-send-btn"
            type="submit"
            disabled={!inputQuery.trim() || isLoading}
            className="px-5 py-3 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs sm:text-sm font-semibold transition disabled:opacity-40 disabled:cursor-not-allowed shadow-xs flex items-center gap-1.5 shrink-0"
          >
            <span>{t.sendBtn}</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
