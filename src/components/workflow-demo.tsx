"use client";

import { useEffect, useReducer, useRef } from 'react';
import * as m from 'framer-motion/m';
import { ArrowLeft, ArrowRight, Check, Download, Package, RotateCcw, Smartphone } from 'lucide-react';
import { useMotionPreference } from './motion-primitives';
import styles from './workflow-demo.module.css';

type Stage = 0 | 1 | 2;
type Phase = 'intake' | 'created' | 'assigned' | 'ready' | 'collected';
type Technician = 'Alex' | 'Jordan';
type SampleState = {
  stage: Stage;
  phase: Phase;
  technician: Technician;
  announcement: string;
  focusVersion: number;
};
type SampleAction =
  | { type: 'create' | 'assign' | 'ready' | 'collect' | 'continue' | 'back' | 'reset' }
  | { type: 'choose'; technician: Technician };

const initialState: SampleState = {
  stage: 0,
  phase: 'intake',
  technician: 'Alex',
  announcement: '',
  focusVersion: 0,
};
const stages = ['Check-in', 'Repair', 'Pickup'] as const;
const statuses: Record<Phase, string> = {
  intake: 'Intake preview',
  created: 'Checked in',
  assigned: 'In progress',
  ready: 'Ready for pickup',
  collected: 'Collected',
};
const screenCost = 6900;
const laborCost = 8000;
const deposit = 3000;
const total = screenCost + laborCost;
const pickupAmount = total - deposit;
const money = (cents: number) => `$${(cents / 100).toFixed(2)}`;

function sampleReducer(state: SampleState, action: SampleAction): SampleState {
  const move = (stage: Stage, announcement = state.announcement): SampleState => ({
    ...state, stage, announcement, focusVersion: state.focusVersion + 1,
  });

  switch (action.type) {
    case 'create':
      if (state.phase !== 'intake' || state.stage !== 0) return state;
      return {
        ...move(1, 'Sample ticket #1048 created for Sam Taylor. Next, assign the repair.'),
        phase: 'created',
      };
    case 'choose':
      return state.phase === 'created' && state.stage === 1
        ? { ...state, technician: action.technician }
        : state;
    case 'assign':
      if (state.phase !== 'created' || state.stage !== 1) return state;
      return {
        ...state,
        phase: 'assigned',
        announcement: `Assigned to ${state.technician}. One screen recorded; five remain in sample stock.`,
      };
    case 'ready':
      if (state.phase !== 'assigned' || state.stage !== 1) return state;
      return {
        ...move(2, 'Sample repair ready for pickup. Balance due: $119.00.'),
        phase: 'ready',
      };
    case 'collect':
      if (state.phase !== 'ready' || state.stage !== 2) return state;
      return {
        ...move(2, 'Sample checkout complete. $30 deposit plus $119 at pickup equals $149 paid. Outstanding balance: $0.00. No real payment was processed.'),
        phase: 'collected',
      };
    case 'continue':
      if (state.stage === 0 && state.phase !== 'intake') return move(1);
      if (state.stage === 1 && (state.phase === 'ready' || state.phase === 'collected')) return move(2);
      return state;
    case 'back':
      if (state.stage === 0) return state;
      return move(state.stage === 2 ? 1 : 0);
    case 'reset':
      return {
        ...initialState,
        focusVersion: state.focusVersion + 1,
        announcement: 'Sample reset. Start with check-in. No live shop data was changed.',
      };
  }
}

export function WorkflowDemo() {
  const [sample, dispatch] = useReducer(sampleReducer, initialState);
  const headings = useRef<Array<HTMLHeadingElement | null>>([]);
  const reduced = useMotionPreference();
  const { stage, phase, technician, announcement, focusVersion } = sample;
  const created = phase !== 'intake';
  const assigned = phase === 'assigned' || phase === 'ready' || phase === 'collected';
  const ready = phase === 'ready' || phase === 'collected';
  const collected = phase === 'collected';
  const completed = [created, ready, collected];
  const stock = assigned ? 5 : 6;
  const outstanding = collected ? 0 : pickupAmount;

  useEffect(() => {
    if (!focusVersion) return;
    const heading = headings.current[stage];
    heading?.focus({ preventScroll: true });
    heading?.scrollIntoView({ block: 'nearest', behavior: 'instant' });
  }, [focusVersion, stage]);

  const taskMotion = (index: Stage) => ({
    initial: false as const,
    animate: { opacity: stage === index ? 1 : 0.68 },
    transition: { duration: reduced ? 0 : 0.16, ease: 'easeOut' as const },
  });

  return (
    <section className={styles.section} id="workflow" aria-labelledby="workflow-heading">
      <div className="container">
        <div className={styles.intro}>
          <h2 id="workflow-heading">Run a sample repair.</h2>
          <p>Check it in, assign the work, and finish pickup—all with sample data.</p>
        </div>

        <noscript>
          <div className={styles.noscript}>
            <p>The interactive sample needs JavaScript. Here is the repair journey:</p>
            <ol>
              <li>Check in the customer, device and reported issue.</li>
              <li>Assign a technician, record the part and mark the repair ready.</li>
              <li>Record any balance due, issue a receipt and finish pickup.</li>
            </ol>
            <a href="#resources">Read the practical shop guides</a>
          </div>
        </noscript>

        <ol className={styles.progress} aria-label="Sample repair progress">
          {stages.map((label, index) => (
            <li
              className={styles.progressStep}
              key={label}
              aria-current={stage === index ? 'step' : undefined}
              data-current={stage === index}
              data-complete={completed[index]}
            >
              <span className={styles.stepMarker} aria-hidden="true">
                {completed[index] ? <Check size={15} /> : index + 1}
              </span>
              <span className={styles.stepLabel}>{label}</span>
              <span className={styles.srOnly}>
                {completed[index] ? ', completed' : stage === index ? ', current stage' : ', upcoming'}
              </span>
            </li>
          ))}
        </ol>

        <div className={styles.surface}>
          <div className={styles.identity}>
            <div className={styles.identityMain}>
              <span className={styles.deviceIcon} aria-hidden="true"><Smartphone size={24} strokeWidth={1.5} /></span>
              <div>
                <p className={styles.deviceTitle}>iPhone 15 screen repair</p>
                <p className={styles.identityMeta}>Sam Taylor <span aria-hidden="true">·</span> Sample #1048</p>
              </div>
            </div>
            <div className={styles.identityActions}>
              <span className={styles.status} data-complete={collected}>
                {collected && <Check size={14} aria-hidden="true" />}{statuses[phase]}
              </span>
              <button className={styles.resetButton} type="button" onClick={() => dispatch({ type: 'reset' })}>
                <RotateCcw size={15} aria-hidden="true" />Reset demo
              </button>
            </div>
          </div>

          <div className={styles.taskStack}>
            <m.div
              className={styles.task}
              data-active={stage === 0}
              aria-hidden={stage !== 0}
              inert={stage !== 0}
              {...taskMotion(0)}
            >
              <h3 className={styles.taskHeading} ref={element => { headings.current[0] = element; }} tabIndex={-1}>Check in the device</h3>
              <dl className={styles.detailsGrid}>
                <div className={styles.detail}><dt className={styles.label}>Customer</dt><dd className={styles.value}>Sam Taylor</dd></div>
                <div className={styles.detail}><dt className={styles.label}>Device</dt><dd className={styles.value}>iPhone 15 · Black</dd></div>
                <div className={`${styles.detail} ${styles.fullWidth}`}><dt className={styles.label}>Reported issue</dt><dd className={`${styles.value} ${styles.issue}`}>Cracked screen. Touch response is intermittent.</dd></div>
              </dl>
              <dl className={styles.amounts}>
                <div className={styles.amount}><dt className={styles.label}>Repair estimate</dt><dd className={styles.value}>{money(total)}</dd></div>
                <div className={styles.amount}><dt className={styles.label}>Sample deposit</dt><dd className={styles.value}>{money(deposit)}</dd></div>
              </dl>
              <div className={styles.actionRow}>
                <p className={styles.actionHint}>{created ? 'Ticket created. Review the details or continue.' : 'Keep the customer, device and issue on one ticket.'}</p>
                <button className={styles.primaryButton} type="button" onClick={() => dispatch({ type: created ? 'continue' : 'create' })}>
                  {created ? 'Continue to repair' : 'Create sample ticket'}<ArrowRight size={17} aria-hidden="true" />
                </button>
              </div>
            </m.div>

            <m.div
              className={styles.task}
              data-active={stage === 1}
              aria-hidden={stage !== 1}
              inert={stage !== 1}
              {...taskMotion(1)}
            >
              <h3 className={styles.taskHeading} ref={element => { headings.current[1] = element; }} tabIndex={-1}>Assign the work</h3>
              <div className={styles.benchGrid}>
                <div className={styles.assignment}>
                  {assigned ? <>
                    <span className={styles.label}>Assigned technician</span>
                    <p className={styles.technician}>{technician}<Check size={17} aria-hidden="true" /></p>
                    <p className={styles.partMeta}>Job owner confirmed</p>
                  </> : <>
                    <label className={styles.label} htmlFor="demo-technician">Assigned technician</label>
                    <select className={styles.select} id="demo-technician" value={technician} onChange={event => {
                      const next = event.currentTarget.value;
                      if (next === 'Alex' || next === 'Jordan') dispatch({ type: 'choose', technician: next });
                    }}>
                      <option>Alex</option><option>Jordan</option>
                    </select>
                    <p className={styles.partMeta}>Choose who will handle this repair.</p>
                  </>}
                </div>
                <div className={styles.part}>
                  <span className={styles.label}>Part for this repair</span>
                  <p className={styles.partName}><Package size={18} aria-hidden="true" />Replacement screen</p>
                  <p className={styles.partMeta}>IP15-OLED</p>
                  <p className={styles.stock}>{stock} in stock <span aria-hidden="true">·</span> {assigned ? '1 recorded on this repair' : '1 needed'}</p>
                </div>
              </div>
              <p className={styles.feedback} data-complete={assigned}>
                {assigned && <Check size={17} aria-hidden="true" />}
                {collected ? 'Repair collected. Payment and receipt recorded.' : ready ? 'Repair complete and ready for pickup.' : assigned ? `${technician} owns the job. One screen is recorded against this repair.` : 'Assign the technician and record one screen in the next step.'}
              </p>
              <div className={styles.actionRow}>
                <button className={styles.backButton} type="button" onClick={() => dispatch({ type: 'back' })}><ArrowLeft size={17} aria-hidden="true" />Back</button>
                <button className={styles.primaryButton} type="button" onClick={() => dispatch({ type: ready ? 'continue' : assigned ? 'ready' : 'assign' })}>
                  {ready ? 'Continue to pickup' : assigned ? 'Mark ready for pickup' : 'Assign & record part'}<ArrowRight size={17} aria-hidden="true" />
                </button>
              </div>
            </m.div>

            <m.div
              className={styles.task}
              data-active={stage === 2}
              aria-hidden={stage !== 2}
              inert={stage !== 2}
              {...taskMotion(2)}
            >
              <h3 className={styles.taskHeading} ref={element => { headings.current[2] = element; }} tabIndex={-1}>{collected ? 'Repair complete' : 'Finish the pickup'}</h3>
              <div className={styles.receiptGrid}>
                <dl className={styles.receipt}>
                  <div className={styles.receiptLine}><dt>Replacement screen</dt><dd>{money(screenCost)}</dd></div>
                  <div className={styles.receiptLine}><dt>Repair labor</dt><dd>{money(laborCost)}</dd></div>
                  <div className={`${styles.receiptLine} ${styles.receiptTotal}`}><dt>Repair total</dt><dd>{money(total)}</dd></div>
                  <div className={styles.receiptLine}><dt>Deposit already paid</dt><dd>−{money(deposit)}</dd></div>
                  <div className={styles.receiptLine} data-recorded={collected} aria-hidden={!collected}><dt>Collected at pickup</dt><dd>{money(pickupAmount)}</dd></div>
                </dl>
                <div className={styles.balance}>
                  <p className={styles.balanceLabel}>{collected ? 'Outstanding balance' : 'Balance due at pickup'}</p>
                  <p className={styles.balanceValue}>{money(outstanding)}</p>
                  <p className={styles.balanceNote}>{collected ? 'Paid in full. Device collected.' : 'The deposit is already included.'}</p>
                  <p className={styles.paidBreakdown} data-recorded={collected} aria-hidden={!collected}><strong>{money(total)} paid</strong><br />{money(deposit)} deposit + {money(pickupAmount)} at pickup</p>
                </div>
              </div>
              <div className={styles.actionRow}>
                <button className={styles.backButton} type="button" onClick={() => dispatch({ type: 'back' })}><ArrowLeft size={17} aria-hidden="true" />Back</button>
                {collected ? <a className={styles.primaryButton} href="/resources/sample-receipt.txt" download>Download sample receipt<Download size={17} aria-hidden="true" /></a> : <button className={styles.primaryButton} type="button" onClick={() => dispatch({ type: 'collect' })}>Complete sample checkout<Check size={17} aria-hidden="true" /></button>}
              </div>
            </m.div>
          </div>
        </div>

        <p className={styles.disclosure}>Sample data only. No real payments.</p>
        <p className={styles.srOnly} role="status" aria-live="polite" aria-atomic="true">{announcement}</p>
      </div>
    </section>
  );
}
