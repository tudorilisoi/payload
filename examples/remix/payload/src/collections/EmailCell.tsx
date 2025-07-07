'use client'

function handleAction(id) {
  // Your action logic here
  console.log('Action triggered for:', id)
}

export const EmailCell: React.FC = ({ rowData }) => (
  <button className="payload-custom-button" onClick={() => handleAction(rowData.id)}>
    Take Action
  </button>
)
