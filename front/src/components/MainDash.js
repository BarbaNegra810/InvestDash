import React from "react";
import "../styles/mainDash.css";

const MainContent = () => {
  return (
    <main className="main-content">
      <header className="header">
        <div>
          <h1 className="title">Total Acumulado</h1>
          <p className="subtitle">Não contempla valores de Renda Fixa (exceto Tesouro Direto e Debêntures), COE e Derivativos (exceto Termo e Opções listadas).</p>
        </div>
        <div className="value-container">
          <p className="value-date">Valor até 08/07/2024</p>
          <h2 className="value">R$ *******</h2>
        </div>
      </header>

      <section className="card-grid">
        <div className="card">
          <h3 className="card-title">Ainda não vê as operações de renda variável que realizou?</h3>
          <p className="card-text">As telas de posição e movimentação trabalham com o conceito de operações liquidadas que acontecem em D+2 da data da compra ou da venda realizada.</p>
        </div>
        <div className="card">
          <h3 className="card-title">Você conhece a Loja da B3?</h3>
          <p className="card-text">Produtos exclusivos para usar com orgulho de inVESTIR</p>
          <button className="button">Acessar</button>
        </div>
        <div className="card">
          <h3 className="card-title">Notificações</h3>
          <ul className="notification-list">
            <li>09/07/2024 - Nova conta de investimentos em seu nome</li>
            {/* Other list items */}
          </ul>
          <a href="#" className="link">Mais notificações</a>
        </div>
      </section>

      <section className="portfolio-section card">
        <h2 className="portfolio-title">Minha carteira</h2>
        <div className="portfolio-controls">
          <div className="button-group">
            <button className="button">Produto</button>
            {/* Other buttons */}
          </div>
          <button className="button primary-button">IR para Posição</button>
        </div>
        <div className="portfolio-graph">
          <img src="https://placehold.co/400x200?text=Gráfico" alt="Gráfico de carteira" className="graph-image" />
          <ul className="portfolio-details">
            <li>Tesouro Direto - 28.3% da carteira</li>
            {/* Other list items */}
          </ul>
        </div>
      </section>
    </main>
  );
};

export default MainContent;

