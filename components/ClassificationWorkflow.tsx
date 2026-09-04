'use client';

import React, { useState } from 'react';
import {
  Layers,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Sparkles,
  RefreshCw,
  Scale,
} from 'lucide-react';
import { Language, I18N } from '@/lib/i18n';
import {
  CLASSIFICATION_QUESTIONS,
  determineCategory,
  ClassificationResult,
  ProductCategory,
} from '@/lib/classification-logic';

interface ClassificationWorkflowProps {
  lang: Language;
  onCategorySelected: (cat: ProductCategory) => void;
  onNavigateToChatWithQuery: (query: string, category: ProductCategory) => void;
  onNavigateToAbs: () => void;
}

export function ClassificationWorkflow({
  lang,
  onCategorySelected,
  onNavigateToChatWithQuery,
  onNavigateToAbs,
}: ClassificationWorkflowProps) {
  const t = I18N[lang];
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({
    primary_intent: 'therapeutic_ingest',
    textual_origin: 'classical_exact',
    synergy_evidence: 'literature_only',
    biological_sourcing: 'cultivated_farms',
  });
  const [result, setResult] = useState<ClassificationResult | null>(null);

  const currentQuestion = CLASSIFICATION_QUESTIONS[currentStepIndex];
  const isLastQuestion = currentStepIndex === CLASSIFICATION_QUESTIONS.length - 1;

  const handleSelectOption = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      const res = determineCategory(answers);
      setResult(res);
      onCategorySelected(res.category);
    } else {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setResult(null);
    setAnswers({
      primary_intent: 'therapeutic_ingest',
      textual_origin: 'classical_exact',
      synergy_evidence: 'literature_only',
      biological_sourcing: 'cultivated_farms',
    });
  };

  const loadPreset = (
    type: 'classical' | 'proprietary' | 'phytopharmaceutical' | 'aahar' | 'cosmetic'
  ) => {
    let presetAnswers: Record<string, string> = {};
    if (type === 'classical') {
      presetAnswers = {
        primary_intent: 'therapeutic_ingest',
        textual_origin: 'classical_exact',
        synergy_evidence: 'literature_only',
        biological_sourcing: 'cultivated_farms',
      };
    } else if (type === 'proprietary') {
      presetAnswers = {
        primary_intent: 'therapeutic_ingest',
        textual_origin: 'modified_classical',
        synergy_evidence: 'synergy_proven',
        biological_sourcing: 'cultivated_farms',
      };
    } else if (type === 'phytopharmaceutical') {
      presetAnswers = {
        primary_intent: 'therapeutic_ingest',
        textual_origin: 'standardized_fraction',
        synergy_evidence: 'clinical_trials',
        biological_sourcing: 'cultivated_farms',
      };
    } else if (type === 'aahar') {
      presetAnswers = {
        primary_intent: 'food_nutrition',
        textual_origin: 'classical_exact',
        synergy_evidence: 'literature_only',
        biological_sourcing: 'cultivated_farms',
      };
    } else if (type === 'cosmetic') {
      presetAnswers = {
        primary_intent: 'topical_cosmetic',
        textual_origin: 'modified_classical',
        synergy_evidence: 'literature_only',
        biological_sourcing: 'cultivated_farms',
      };
    }

    setAnswers(presetAnswers);
    const res = determineCategory(presetAnswers);
    setResult(res);
    onCategorySelected(res.category);
  };

  return (
    <div id="classification-workflow-section" className="space-y-6">
      {/* Header & Quick Archetype Presets */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
                <Layers className="w-4 h-4" />
              </span>
              <h2 className="text-xl font-bold text-stone-900">
                {lang === 'hi' ? 'आयुर्वेदिक उत्पाद वर्गीकरण विज़ार्ड' : 'Product Classification Engine'}
              </h2>
            </div>
            <p className="text-xs text-stone-600">
              {lang === 'hi'
                ? 'सिद्धांत: विस्तृत आईपी मार्गदर्शन से पूर्व श्रेणी वर्गीकरण आवश्यक है। ६ विनियामक श्रेणियों में विभाजन।'
                : 'PRD Principle: Classification before detailed guidance. Routes formulations into 6 statutory categories.'}
            </p>
          </div>

          {/* Preset Buttons for Fast Demo */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-semibold text-stone-500 mr-1">
              {lang === 'hi' ? 'त्वरित नमूने:' : 'Quick Presets:'}
            </span>
            <button
              id="preset-classical-btn"
              onClick={() => loadPreset('classical')}
              className="text-xs px-2.5 py-1 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium transition"
            >
              Classical
            </button>
            <button
              id="preset-proprietary-btn"
              onClick={() => loadPreset('proprietary')}
              className="text-xs px-2.5 py-1 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium transition"
            >
              Proprietary
            </button>
            <button
              id="preset-phyto-btn"
              onClick={() => loadPreset('phytopharmaceutical')}
              className="text-xs px-2.5 py-1 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium transition"
            >
              Phytopharm
            </button>
            <button
              id="preset-aahar-btn"
              onClick={() => loadPreset('aahar')}
              className="text-xs px-2.5 py-1 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium transition"
            >
              Aahar (Food)
            </button>
            <button
              id="preset-cosmetic-btn"
              onClick={() => loadPreset('cosmetic')}
              className="text-xs px-2.5 py-1 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium transition"
            >
              Cosmetic
            </button>
          </div>
        </div>

        {/* Stepper Progress Bar */}
        {!result && (
          <div className="mt-6 pt-4 border-t border-stone-100">
            <div className="flex items-center justify-between text-xs font-semibold text-stone-500 mb-2">
              <span>
                {lang === 'hi' ? `प्रश्न ${currentStepIndex + 1} / ${CLASSIFICATION_QUESTIONS.length}` : `Question ${currentStepIndex + 1} of ${CLASSIFICATION_QUESTIONS.length}`}
              </span>
              <span>{Math.round(((currentStepIndex + 1) / CLASSIFICATION_QUESTIONS.length) * 100)}% Completed</span>
            </div>
            <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-700 transition-all duration-300 rounded-full"
                style={{ width: `${((currentStepIndex + 1) / CLASSIFICATION_QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Main Question Body OR Result Card */}
      {!result ? (
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-6">
          <div>
            <h3 className="text-base font-bold text-stone-900 mb-1">
              {lang === 'hi' ? currentQuestion.questionHi : currentQuestion.questionEn}
            </h3>
            <p className="text-xs text-stone-500">
              {lang === 'hi' ? currentQuestion.hintHi : currentQuestion.hintEn}
            </p>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {currentQuestion.options.map((opt) => {
              const isSelected = answers[currentQuestion.id] === opt.id;
              return (
                <button
                  key={opt.id}
                  id={`opt-${opt.id}`}
                  onClick={() => handleSelectOption(currentQuestion.id, opt.id)}
                  className={`text-left p-4 rounded-xl border transition-all ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-500/20'
                      : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50/80 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-semibold text-xs text-stone-900 leading-snug">
                      {lang === 'hi' ? opt.labelHi : opt.labelEn}
                    </span>
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-600 text-white'
                          : 'border-stone-300'
                      }`}
                    >
                      {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                    </div>
                  </div>
                  <p className="text-[11px] text-stone-600 mt-2 leading-relaxed">
                    {lang === 'hi' ? opt.descriptionHi : opt.descriptionEn}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Nav Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-stone-100">
            <button
              id="prev-question-btn"
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border ${
                currentStepIndex === 0
                  ? 'opacity-40 cursor-not-allowed border-stone-200 text-stone-400'
                  : 'border-stone-300 hover:bg-stone-50 text-stone-700'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              {lang === 'hi' ? 'पिछला' : 'Previous'}
            </button>

            <button
              id="next-question-btn"
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-semibold bg-emerald-800 hover:bg-emerald-900 text-white shadow-xs transition"
            >
              {isLastQuestion ? (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
                  {lang === 'hi' ? 'वर्गीकरण परिणाम देखें' : 'Determine Classification'}
                </>
              ) : (
                <>
                  {lang === 'hi' ? 'अगला' : 'Next'}
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        /* Result Output Card */
        <div id="classification-result-card" className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900">
                  {lang === 'hi' ? 'वर्गीकृत श्रेणी' : 'Classification Result'}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-800 border border-blue-200">
                  {result.confidence} Confidence
                </span>
              </div>
              <h3 className="text-xl font-bold text-stone-900 mt-2">
                {lang === 'hi' ? result.categoryHi : result.category}
              </h3>
            </div>

            <button
              id="reclassify-btn"
              onClick={handleReset}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 text-xs font-medium text-stone-600 transition self-start"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              {lang === 'hi' ? 'पुनः वर्गीकरण' : 'Re-classify'}
            </button>
          </div>

          {/* Grid Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Plain Meaning */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80">
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-1">
                {lang === 'hi' ? 'सरल अर्थ' : 'Plain Meaning'}
              </h4>
              <p className="text-xs text-stone-700 leading-relaxed">
                {lang === 'hi' ? result.plainMeaningHi : result.plainMeaningEn}
              </p>
            </div>

            {/* Why it Matters */}
            <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200/70">
              <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wider mb-1">
                {lang === 'hi' ? 'मार्गदर्शन क्यों बदलता है' : 'Why it Changes Guidance'}
              </h4>
              <p className="text-xs text-emerald-900 leading-relaxed">
                {lang === 'hi' ? result.whyItMattersHi : result.whyItMattersEn}
              </p>
            </div>

            {/* Patentability Standard */}
            <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/70">
              <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wider mb-1">
                {lang === 'hi' ? 'पेटेंट पात्रता प्रभाव' : 'Patentability Impact'}
              </h4>
              <p className="text-xs text-amber-900 leading-relaxed">
                {lang === 'hi' ? result.patentabilityImpactHi : result.patentabilityImpactEn}
              </p>
            </div>

            {/* Regulatory License Pathway */}
            <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-200/70">
              <h4 className="text-xs font-bold text-blue-950 uppercase tracking-wider mb-1">
                {lang === 'hi' ? 'विनियामक लाइसेंसिंग मार्ग' : 'Regulatory Licensing Pathway'}
              </h4>
              <p className="text-xs text-blue-900 leading-relaxed">
                {lang === 'hi' ? result.regulatoryPathwayHi : result.regulatoryPathwayEn}
              </p>
            </div>
          </div>

          {/* Action Items */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              {lang === 'hi' ? 'सुझाए गए व्यावहारिक कदम' : 'Recommended Action Items'}
            </h4>
            <ul className="space-y-1.5">
              {result.suggestedActionItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                  <span className="text-emerald-700 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              id="test-in-chat-btn"
              onClick={() => {
                const query =
                  result.category === 'Classical Medicine'
                    ? 'I have a formulation from a traditional text. Can I patent it?'
                    : result.category === 'Proprietary Medicine'
                    ? 'I developed a new herbal formulation. What should I check before commercialization?'
                    : `What are the IPR and regulatory requirements for a ${result.category}?`;
                onNavigateToChatWithQuery(query, result.category);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-emerald-800 hover:bg-emerald-900 text-white shadow-xs transition"
            >
              <Sparkles className="w-4 h-4 text-emerald-300" />
              {lang === 'hi' ? 'सहायक चैट में परीक्षण करें' : 'Test Category in Assistant Chat'}
            </button>

            <button
              id="check-abs-cta-btn"
              onClick={onNavigateToAbs}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold border border-stone-300 hover:bg-stone-50 text-stone-800 transition"
            >
              <Scale className="w-4 h-4 text-stone-600" />
              {lang === 'hi' ? 'एबीएस अनुपालन जांचें' : 'Evaluate ABS Requirements'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
