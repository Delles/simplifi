export default function About() {
    return (
        <div className="p-6 md:p-8 max-w-4xl mx-auto">
            <header className="mb-10 text-center">
                <h1 className="text-h1 font-bold text-graphite mb-2">
                    About SimpliFi
                </h1>
                <p className="text-xl text-slate">
                    {" "}
                    {/* Adjusted for subtitle size */}
                    Your MultiversX ESDT Launch & Management Platform
                </p>
            </header>

            <section className="mb-8">
                <h2 className="text-h2 font-semibold text-graphite mb-4 pb-2 border-b border-gray-300">
                    Our Mission & Vision
                </h2>
                <p className="text-body-primary text-slate mb-4">
                    SimpliFi is dedicated to providing the simplest, most
                    intuitive interface for users to launch, manage, and airdrop
                    ESDT tokens, as well as provide initial liquidity on
                    MultiversX Decentralized Exchanges (DEXes).
                </p>
                <p className="text-body-primary text-slate">
                    Our vision is to democratize token creation and initial
                    liquidity provision on the MultiversX blockchain. We aim to
                    make these powerful processes accessible to everyone—from
                    non-technical creators and communities to entrepreneurs and
                    developers—thereby fostering innovation and growth within
                    the MultiversX ecosystem.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-h2 font-semibold text-graphite mb-4 pb-2 border-b border-gray-300">
                    What SimpliFi Offers (V1 Focus)
                </h2>
                <p className="text-body-primary text-slate mb-5">
                    SimpliFi provides a comprehensive suite of tools designed
                    for ease of use, security, and seamless integration with the
                    MultiversX network:
                </p>
                <ul className="list-disc list-inside text-body-primary text-slate space-y-3 pl-5">
                    <li>
                        <strong>Guided ESDT Token Creation:</strong> Launch your
                        fungible tokens with configurable properties (e.g.,
                        supply, burnable, pausable, mintable) through an
                        intuitive, step-by-step wizard.
                    </li>
                    <li>
                        <strong>Token Management Dashboard:</strong> Easily
                        manage your created tokens. Perform actions like minting
                        additional supply (if enabled), pausing operations, or
                        transferring ownership, all based on your token&apos;s
                        initial setup.
                    </li>
                    <li>
                        <strong>Efficient Airdrop Tool:</strong> Distribute your
                        tokens to multiple recipients. SimpliFi intelligently
                        chooses between native MultiversX features for smaller
                        lists and a dedicated, audited smart contract for
                        large-scale campaigns.
                    </li>
                    <li>
                        <strong>Simplified Initial DEX Liquidity:</strong> Add
                        initial liquidity for your token on xExchange, making it
                        tradable within the ecosystem. We guide you through the
                        process with clear explanations and risk awareness.
                    </li>
                </ul>
                <p className="text-body-primary text-slate mt-4">
                    All transactions are signed securely through your preferred
                    MultiversX wallet (e.g., xPortal, MultiversX DeFi Wallet,
                    Ledger), ensuring you always remain in control of your
                    assets. SimpliFi never has access to your private keys.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-h2 font-semibold text-graphite mb-4 pb-2 border-b border-gray-300">
                    Our Core Principles
                </h2>
                <div className="grid md:grid-cols-2 gap-x-6 gap-y-4">
                    <div>
                        <h3 className="font-semibold text-graphite text-lg mb-1">
                            Simplicity & Accessibility
                        </h3>
                        <p className="text-body-primary text-slate">
                            We abstract blockchain complexities, offering guided
                            processes for users without prior smart contract
                            programming knowledge.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-graphite text-lg mb-1">
                            Security
                        </h3>
                        <p className="text-body-primary text-slate">
                            Prioritizing safe interactions through non-custodial
                            wallet connections and audited smart contracts where
                            custom logic is essential (like our Airdrop SC).
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-graphite text-lg mb-1">
                            Education & Transparency
                        </h3>
                        <p className="text-body-primary text-slate">
                            Integrating contextual help and clear explanations
                            to empower users to make informed decisions and
                            understand all actions, costs, and consequences.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-graphite text-lg mb-1">
                            Ecosystem Integration
                        </h3>
                        <p className="text-body-primary text-slate">
                            Seamlessly connecting with core MultiversX services
                            like xExchange and standard wallet providers via
                            @multiversx/sdk-dapp.
                        </p>
                    </div>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-h2 font-semibold text-graphite mb-4 pb-2 border-b border-gray-300">
                    Who is SimpliFi For?
                </h2>
                <p className="text-body-primary text-slate mb-4">
                    SimpliFi is designed for a diverse range of users within the
                    MultiversX ecosystem, including:
                </p>
                <ul className="list-disc list-inside text-body-primary text-slate space-y-1.5 pl-5">
                    <li>
                        Creators, artists, and community leaders launching fan
                        or community tokens.
                    </li>
                    <li>
                        Startups and entrepreneurs creating tokens for their
                        projects or loyalty programs.
                    </li>
                    <li>
                        Small to Medium Businesses (SMBs) exploring tokenized
                        rewards.
                    </li>
                    <li>
                        Community managers needing to airdrop tokens to their
                        members.
                    </li>
                    <li>
                        Developers looking for a rapid and straightforward way
                        to deploy standard ESDTs.
                    </li>
                    <li>
                        Non-technical individuals interested in exploring
                        tokenization on MultiversX.
                    </li>
                </ul>
            </section>

            <footer className="text-center pt-6 border-t border-gray-300 mt-10">
                <p className="text-body-primary text-slate">
                    SimpliFi is proudly built on the{" "}
                    <a
                        href="https://multiversx.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline font-medium"
                    >
                        MultiversX blockchain
                    </a>
                    , leveraging its speed, security, and scalability to deliver
                    a superior user experience.
                </p>
            </footer>
        </div>
    );
}
