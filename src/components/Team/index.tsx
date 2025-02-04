import { MDXProvider } from '@mdx-js/react'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { kebabCase } from 'lib/utils'
import React from 'react'
import ReactCountryFlag from 'react-country-flag'
import { shortcodes } from '../../mdxGlobalComponents'
import Link from 'components/Link'
import Layout from 'components/Layout'

export default function TeamNew() {
    const {
        team: { teamMembers },
    } = useStaticQuery(query)
    return (
        <Layout>
            <ul className="list-none pt-16 pb-8 m-0 flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-6 gap-y-12 max-w-screen-2xl mx-auto px-8 2xl:px-4 3xl:p-0">
                {teamMembers.map((teamMember) => {
                    const {
                        avatar: { url: avatar },
                        lastName,
                        firstName,
                        companyRole,
                        country,
                        squeakId,
                        location,
                    } = teamMember
                    const name = [firstName, lastName].filter(Boolean).join(' ')
                    return (
                        <li
                            key={name}
                            className="bg-accent dark:bg-accent-dark border border-light dark:border-dark rounded h-40 relative hover:-translate-y-0.5 active:translate-y-0 hover:transition-all hover:border-b-[4px] active:border-b-1 active:top-[2px]"
                        >
                            <Link
                                to={`/community/profiles/${squeakId}`}
                                className="flex justify-between h-full relative text-primary dark:text-primary-dark hover:text-primary dark:hover:text-primary-dark"
                            >
                                <div className="flex flex-col justify-between px-6 py-4 w-full mr-32 xl:mr-40">
                                    <div>
                                        <h3
                                            className="mb-0 text-lg leading-tight"
                                            id={kebabCase(name) + '-' + kebabCase(companyRole)}
                                        >
                                            {name}
                                        </h3>
                                        <p className="text-primary/50 text-sm dark:text-primary-dark/50">
                                            {companyRole}
                                        </p>
                                    </div>

                                    <span className="flex items-center gap-2">
                                        {country === 'world' ? '🌎' : <ReactCountryFlag svg countryCode={country} />}
                                        {country === 'world' ? (
                                            <span className="opacity-50 text-sm">Planet earth</span>
                                        ) : (
                                            <span className="opacity-50 text-sm">{location || country}</span>
                                        )}
                                    </span>
                                </div>

                                <figure className="m-0 -mt-8 p-0 absolute right-0 bottom-0">
                                    <img src={avatar} className="w-[200px]" />
                                </figure>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </Layout>
    )
}

const query = graphql`
    query TeamQuery {
        team: allSqueakProfile(
            filter: { teams: { data: { elemMatch: { id: { ne: null } } } } }
            sort: { fields: startDate, order: ASC }
        ) {
            teamMembers: nodes {
                squeakId
                avatar {
                    url
                }
                lastName
                firstName
                companyRole
                country
                location
                pronouns
            }
        }
    }
`
