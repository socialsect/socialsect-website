// Function to handle the spotlight effect on cards
export function initCardSpotlight() {
  const cards = document.querySelectorAll(
    '.webdev-service-card, .webdev-process-step, .webdev-metric-card, .webdev-industry-item, .webdev-bento-feature'
  );

  function handleMouseMove(e) {
    const { currentTarget: card } = e;
    const rect = card.getBoundingClientRect();
    
    // Calculate mouse position relative to the card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Update custom properties
    card.style.setProperty('--x', `${x}px`);
    card.style.setProperty('--y', `${y}px`);
  }

  function handleMouseLeave() {
    // Reset position when mouse leaves
    this.style.removeProperty('--x');
    this.style.removeProperty('--y');
  }

  // Add event listeners to each card
  cards.forEach(card => {
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
  });

  // Cleanup function to remove event listeners
  return () => {
    cards.forEach(card => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    });
  };
}
