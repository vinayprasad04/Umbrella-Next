import React from 'react';


interface EntityTypeProps {
    entityType: string;
    setEntityType: (value: string) => void;
}

const EntityType: React.FC<EntityTypeProps> = ({entityType, setEntityType}) => {
    return(
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Entity Type</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                    { id: 'individual', label: 'Individual', icon: '', description: 'Personal tax filing' },
                    { id: 'huf', label: 'HUF', icon: '', description: 'Hindu Undivided Family' },
                    { id: 'firm', label: 'Firm', icon: '', description: 'Partnership Firm' },
                    { id: 'company', label: 'Company', icon: '', description: 'Corporate Entity' }
                ].map((entity) => (
                    <button
                        key={entity.id}
                        onClick={() => setEntityType(entity.id)}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                            entityType === entity.id
                                ? 'border-[#FF6B2C] bg-orange-50 shadow-md'
                                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                        }`}
                    >
                        <div className="text-center">
                            <div className="text-2xl mb-2">{entity.icon}</div>
                            <div className={`font-semibold text-sm ${
                                entityType === entity.id ? 'text-[#FF6B2C]' : 'text-gray-700'
                            }`}>
                                {entity.label}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">{entity.description}</div>
                        </div>
                    </button>
                ))}
            </div>
            {entityType !== 'individual' && (
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start gap-2">
                        <span className="text-yellow-600 mt-0.5">!</span>
                        <div>
                            <div className="font-semibold text-yellow-800 text-sm">
                                {entityType === 'huf' && 'HUF Tax Rates Apply'}
                                {entityType === 'firm' && 'Partnership Firm Tax Rules Apply'}
                                {entityType === 'company' && 'Corporate Tax Rates Apply'}
                            </div>
                            <div className="text-yellow-700 text-xs mt-1">
                                {entityType === 'huf' && 'HUF has same tax slabs as individuals but different exemption rules.'}
                                {entityType === 'firm' && 'Flat 30% tax rate on total income. No personal exemptions apply.'}
                                {entityType === 'company' && 'Corporate tax rates: 25-30% based on turnover. Different compliance requirements.'}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default EntityType;