import React from "react";
import { Button, Link, Spacer, Tooltip } from "@nextui-org/react";
import { FaGithub } from "react-icons/fa";

interface NavbarProps {
    children?: React.ReactNode;
}

export const Navbar: React.FC<NavbarProps> = ({ children }) => {
    return (
        <nav className="bg-white text-zinc-900 w-1/5 h-full flex flex-col items-start justify-between p-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight leading-none">Graphviz Sandbox</h1>
                <Spacer y={4} />
                <div className="flex flex-col gap-2">
                    {children}
                </div>
            </div>
            <div>
                <Tooltip content="View on Github" placement="right" closeDelay={0} size="sm">
                    <Button
                        size="sm"
                        variant="flat"
                        isIconOnly as={Link}
                        href="https://github.com/noahshotz/graphviz-vite"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        <FaGithub size={21} />
                    </Button>
                </Tooltip>
                <Spacer y={2} />
                <p className="text-xs">
                    Built during and for Software Tool Construction course at Berliner Hochschule für Technik (BHT) WiSe 2024/2025
                </p>
            </div>
        </nav>
    )
};