import { Link } from "react-router-dom";

export default function EmptyTokenState() {
    return (
        <div className="relative group">
            {/* Background gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-create-50 via-manage-50 to-distribute-50 rounded-2xl opacity-60"></div>

            {/* Decorative background elements */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-create-500 to-indigo-500 rounded-full blur-3xl transform translate-x-16 -translate-y-16 animate-spin-slow"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-manage-500 to-emerald-500 rounded-full blur-2xl transform -translate-x-12 translate-y-12"></div>
                <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-gradient-to-br from-distribute-500 to-amber-500 rounded-full blur-xl transform -translate-x-10 -translate-y-10 animate-bounce-gentle"></div>
            </div>

            {/* Main content */}
            <div className="relative backdrop-blur-sm bg-white/90 rounded-2xl border border-white/50 shadow-level-2 hover:shadow-level-3 transition-all duration-500 p-8 md:p-12 text-center">
                {/* Animated icon */}
                <div className="mb-8 animate-bounce-gentle">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-create-500 via-manage-500 to-distribute-500 rounded-2xl shadow-lg mb-4">
                        <span className="text-4xl">🚀</span>
                    </div>
                    <div className="flex justify-center gap-2 animate-pulse-gentle">
                        <div className="w-2 h-2 bg-create-500 rounded-full"></div>
                        <div
                            className="w-2 h-2 bg-manage-500 rounded-full"
                            style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                            className="w-2 h-2 bg-distribute-500 rounded-full"
                            style={{ animationDelay: "0.4s" }}
                        ></div>
                    </div>
                </div>

                {/* Hero content */}
                <div className="max-w-2xl mx-auto mb-8">
                    <h3 className="text-3xl md:text-4xl font-bold text-graphite mb-4 animate-fade-in-up">
                        Ready to democratize your ideas?
                    </h3>

                    <p
                        className="text-lg text-slate leading-relaxed mb-6 animate-fade-in-up"
                        style={{ animationDelay: "0.1s" }}
                    >
                        Join{" "}
                        <span className="font-semibold text-graphite">
                            thousands of creators, artists, and entrepreneurs
                        </span>{" "}
                        who've launched their token economy with SimpliFi.
                    </p>

                    {/* Stats showcase */}
                    <div
                        className="grid grid-cols-3 gap-6 mb-8 animate-fade-in-up"
                        style={{ animationDelay: "0.2s" }}
                    >
                        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-level-1">
                            <div className="text-2xl font-bold text-create-600 mb-1">
                                12K+
                            </div>
                            <div className="text-xs text-slate font-medium">
                                Tokens Created
                            </div>
                        </div>
                        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-level-1">
                            <div className="text-2xl font-bold text-manage-600 mb-1">
                                3.2K+
                            </div>
                            <div className="text-xs text-slate font-medium">
                                Active Creators
                            </div>
                        </div>
                        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-level-1">
                            <div className="text-2xl font-bold text-distribute-600 mb-1">
                                8.9K+
                            </div>
                            <div className="text-xs text-slate font-medium">
                                Successful Airdrops
                            </div>
                        </div>
                    </div>
                </div>

                {/* Primary CTA */}
                <div
                    className="mb-8 animate-fade-in-up"
                    style={{ animationDelay: "0.3s" }}
                >
                    <Link
                        to="/app/create-token"
                        className="group/cta inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-create-500 via-manage-500 to-distribute-500 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                    >
                        <span className="text-2xl group-hover/cta:scale-110 transition-transform duration-200">
                            🎯
                        </span>
                        <span>Create Your First Token</span>
                        <svg
                            className="w-6 h-6 group-hover/cta:translate-x-1 transition-transform duration-200"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                        </svg>
                    </Link>
                </div>

                {/* Educational section */}
                <div
                    className="border-t border-white/20 pt-8 animate-fade-in-up"
                    style={{ animationDelay: "0.4s" }}
                >
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <span className="text-xl">💡</span>
                        <p className="text-base font-semibold text-graphite">
                            New to tokens? Start with the basics:
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/app/learn"
                            className="group/learn flex items-center gap-3 px-6 py-3 bg-white/70 backdrop-blur-sm border border-create-200 text-create-600 rounded-xl font-medium hover:bg-create-50 hover:shadow-level-2 transition-all duration-200 transform hover:scale-105"
                        >
                            <span className="text-lg group-hover/learn:scale-110 transition-transform duration-200">
                                📚
                            </span>
                            <span>Learn Tokenomics</span>
                        </Link>

                        <Link
                            to="/community"
                            className="group/community flex items-center gap-3 px-6 py-3 bg-white/70 backdrop-blur-sm border border-distribute-200 text-distribute-600 rounded-xl font-medium hover:bg-distribute-50 hover:shadow-level-2 transition-all duration-200 transform hover:scale-105"
                        >
                            <span className="text-lg group-hover/community:scale-110 transition-transform duration-200">
                                👥
                            </span>
                            <span>See Success Stories</span>
                        </Link>
                    </div>
                </div>

                {/* Inspiring quote */}
                <div
                    className="mt-8 animate-fade-in-up"
                    style={{ animationDelay: "0.5s" }}
                >
                    <div className="bg-gradient-to-r from-create-50 via-manage-50 to-distribute-50 rounded-xl p-4 border border-white/30">
                        <div className="flex items-center justify-center gap-2 text-sm">
                            <span className="text-lg">✨</span>
                            <span className="font-medium text-graphite">
                                "Your ideas deserve to reach the world. Start
                                your token journey today!"
                            </span>
                            <span className="text-lg">✨</span>
                        </div>
                    </div>
                </div>

                {/* Decorative corner elements */}
                <div className="absolute top-4 right-4 opacity-30">
                    <div className="flex gap-1">
                        <div className="w-1 h-1 bg-create-500 rounded-full animate-ping"></div>
                        <div
                            className="w-1 h-1 bg-manage-500 rounded-full animate-ping"
                            style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                            className="w-1 h-1 bg-distribute-500 rounded-full animate-ping"
                            style={{ animationDelay: "0.4s" }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
