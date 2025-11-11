
import React, { useState } from 'react';
import { Icon } from './Icon';

const principles = [
    { title: 'Technique is Key', description: 'Technique must always be controlled. If technique suffers, the movement becomes dangerous quickly.' },
    { title: 'Progressive Overload', description: 'To make progress, you need to "surprise" your muscles by periodically changing exercises or increasing the number of reps or sets.' },
    { title: 'Standard Weight Selection', description: 'For most sets (e.g., 3x10), choose a weight that is challenging, allowing you to leave one repetition in reserve.' },
    { title: 'Max Effort Sets', description: "For the final set of an exercise (if noted as 'Max'), perform with maximum effort, giving 0 or 10 reps and expending all energy." },
    { title: 'Rest (Basic Lifts)', description: 'Rest between sets in basic exercises (squat, bench press, deadlift) is 4 minutes.' },
    { title: 'Rest (Other Lifts)', description: 'Rest between other accessory exercises is 3 minutes.' },
    { title: 'Core Importance', description: 'ABS and back muscles are your corset, injury protection, and your strength. A dedicated core workout must be done once a week.' },
];

const PrinciplesCard: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-white rounded-xl shadow-md">
            <button
                className="w-full flex items-center justify-between p-6 text-left"
                onClick={() => setIsExpanded(!isExpanded)}
                aria-expanded={isExpanded}
                aria-controls="principles-content"
            >
                <div className="flex items-center gap-3">
                    <Icon name="lightbulb" className="w-6 h-6 text-yellow-500" />
                    <h3 className="text-xl font-semibold text-slate-900">Core Principles</h3>
                </div>
                <Icon name="chevronDown" className={`w-5 h-5 text-slate-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            </button>
            {isExpanded && (
                 <div id="principles-content" className="px-6 pb-6">
                    <div className="border-t border-slate-200 pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 text-sm">
                        {principles.map((principle, index) => (
                            <div key={index}>
                                <p className="font-semibold text-slate-800">{principle.title}</p>
                                <p className="text-slate-600">{principle.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PrinciplesCard;
