import { notFound } from 'next/navigation';
import { getPageConfig, getMarkdownContent, getBibtexContent } from '@/lib/content';
import { getConfig } from '@/lib/config';
import { parseBibTeX } from '@/lib/bibtexParser';
import PublicationsList from '@/components/publications/PublicationsList';
import TextPage from '@/components/pages/TextPage';
import CardPage from '@/components/pages/CardPage';
import {
    BasePageConfig,
    PublicationPageConfig,
    TextPageConfig,
    CardPageConfig
} from '@/types/page';

import { Metadata } from 'next';

export function generateStaticParams() {
    const config = getConfig();
    return config.navigation
        .filter(nav => nav.type === 'page' && nav.target !== 'about') // 'about' is handled by root page
        .map(nav => ({
            slug: nav.target,
        }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const pageConfig = getPageConfig(slug) as BasePageConfig | null;

    if (!pageConfig) {
        return {};
    }

    return {
        title: pageConfig.title,
        description: pageConfig.description,
    };
}

export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const pageConfig = getPageConfig(slug) as BasePageConfig | null;

    if (!pageConfig) {
        notFound();
    }

    // Load data on the server side based on page type
    let content: string | undefined;
    let publications: ReturnType<typeof parseBibTeX> | undefined;

    if (pageConfig.type === 'text') {
        const textConfig = pageConfig as TextPageConfig;
        content = getMarkdownContent(textConfig.source);
    } else if (pageConfig.type === 'publication') {
        const pubConfig = pageConfig as PublicationPageConfig;
        const bibtex = getBibtexContent(pubConfig.source);
        publications = parseBibTeX(bibtex);
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {pageConfig.type === 'publication' && publications && (
                <PublicationsList config={pageConfig as PublicationPageConfig} publications={publications} />
            )}
            {pageConfig.type === 'text' && content !== undefined && (
                <TextPage config={pageConfig as TextPageConfig} content={content} />
            )}
            {pageConfig.type === 'card' && (
                <CardPage config={pageConfig as CardPageConfig} />
            )}
        </div>
    );
}
