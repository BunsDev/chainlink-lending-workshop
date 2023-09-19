# Lecture Notes

## Traditional (TradFi) vs. Decentralized (DeFi)
Let's review some of the primary distinctions that exist between traditional lending network and decentralized lending markets. This comparison will serve to highlight the fundamentals of loans and help up create the foundations for the utility narrative of oracles, which are an inherent aspect of securing loans in DeFi. Without Oracle networks, such as Chainlink, lending markets would be subject to security concerns that would make them highly undesirable.

Now, let's dive into a discussion on Traditional vs. Decentralized lending markets to set the stage for the rest of our workshop.

## Traditional Lending Markets

Traditional Lending Markets are distinct from Decentralized Lending Markets in a number of ways. Most of these distinctions are due to the centralized nature of off-chain loans.

Some of the primary distinction include those listed in this slide.

1. Loan Applications: in traditional finance, lenders require borrowers to submit a standardized loan application, which reveals personal information about the borrowing, so the lender may score the risk associated with the borrower's ability to repay the loan.

2. Credit Checks: these are performed at the application stage and help the lender construct a risk profile for the loan, which informs the interest rate offered.

3. Sometimes, if the credit check doesn't report back desirable results, a lender may request collateral from the borrower to secure at least some portion of the loan's value. Note that collateral is not always required and over-collateralization is not needed in this environment.

4. Approval: in order to get a loan, after an application is submitted and personal details are divulged, approval is required, otherwise the loan is denied and the borrower will have to look elsewhere for a loan. Unfortunately for the applicant, however, since a credit check was performed, simply inquiring for approval makes future attempts more difficult after a denial is made.

5. Bank-Issued: in traditional finance, banks are the end-all-be-all and are authorized to process loans. This means you are liable for the rules and regulations of a given bank, which may even mean penalties that are enforceable in the court of law, including repossession of collateral or items you own -- even if they were not originally tied to the loan.

6. Term Limits: diamonds last forever, but loans oftentimes have an expiration date. If you do not pay off your loan in time, then you are subject to sometimes severe financial penalties and risk losing much more than you borrowed.


## Decentralized Lending Markets

Decentralized Lending Markets are distinct from their traditional counterparts in a number of ways. These distinctions primary come from the fact that a decentralized loan is issued on a public ledger and involves a peer-to-peer network to facilitate the loan process.

1. No Application: since third parties are eliminated from the picture altogether in a decentralized market, there is no one to accept or deny your application. The requirements are transparent and consistent. The Code is Law in this case.

2. Over-Collateralized: in order to secure loans for suppliers, collateral must exceed the amount requested in the loan. Why might someone want to put up more value than they want to borrow? Think about it this way: if you have a lot of Fantom (FTM) and you believe the price of FTM will increase over time, then you may be hesitant to sell FTM to pay for things. However, if the need so arises to spend money, decentralized lending markets enables you to keep you asset, in this case FTM, while still tapping into the underlying value. This eliminates the need to sell Fantom, while still allowing for you to remain liquid.

3. No Credit Check: since there is no application and the loan is already sufficiently backed via collateral, no credit check is required. This is secured by the ability to liquidate a loan if the value of the underlying collateral is at risk of falling below the value of the loan.

4. Peer-to-Peer: banks are removed from the equation in DeFi, so you can rely on a decentralized network to provide the funds you need. Suppliers are incentivized to provide assets. In the case of SoulSwap, for example, we allow suppliers to not only benefit from elastic interest rates, but also from SOUL emissions if the supplier decides to deposit their lending receipt tokens in our liquidity mine (aka our farms).

5. Indefinite Term: unlike in traditional markets, there is no expiration date on the loan, so you never have to repay the loan. So long as your position remains in a healthy state, such that the collateral is more than enough to cover the lent value, there is no rush to pay back your loan and thus no need to get stuck in a cycle of paying off loan interest that far outweighs the principle value of your loan.

6. Privacy: since transactions are done on a blockchain that is not inherently tied to your identity, you may access loans without having to rely on centralized servers to store your private information, like you SSN, mailing address, credit score, loan history, outstanding debt with other lenders, etc.

## Comparison Summary
It should be clear now that there are some notable distinction between Traditional vs. Decentralized Lending Markets. These distinctions make loans on the blockchain more enticing than those found in traditional finance as DeFi allows for you to leverage the value of your investments, without having to sell them. Additionally, DeFi unlocks new opportunities to earn yield by supplying assets, since anyone can become a bank. Lastly, DeFi does not risk losses beyond your collateral -- there is no way to lose your hard earned assets that you did not tie into the loan. Your car, home, and credit scores are safe in DeFi. 

Now that we are aware of these distinctions, are there any questions or considerations anyone would like to share?

If not, then we will proceed with diving into how we can make use of Chainlink Oracles to secure Lending Markets in DeFi.

## Oracles: Preface
Now let's dive into Oracles to evaluate the role Chainlink plays in Decentralized Lending Markets and we will conclude this section with an exercise that will enable you to leverage a custom API that uses data from smart contracts that can be pulled into your bots or a frontend for your community.

## Using Oracles: Introduction
Chainlink enables us to do some DeFi wizardry by unlocking the value of Oracles to discover the price of a given asset, which is gathered and verified internally by the Chainlink Network.

Let's dive into Oracles: what they are and why they're so reliable, then we will cover Price Feeds, and finally wrap things up by creating a custom API of our own that makes use of DeFi magick.

## What Are Price Feeds?
Price Feeds are pretty straight-forward, conceptually, as it is in the name. Generally speaking, Chainlink Data Feeds are the quickest way to connect your smart contracts to the real-world market prices of assets. For our example, we use for data feeds to enable smart contracts to retrieve the latest pricing data of an asset in a single call, this is what is referred to as a Price Feed.

In the instance of lending markets, we use Price Feeds to acquire the most up-to-date price for a given asset.

We rely on the manipulation-resistance that is inherit in the Chainlink Oracle Network as data feeds pull from multiple sources and are fact-checked by the Network.

We use price feeds for SoulSwap's Underworld Lending Markets to ensure accurate reporting on the frontend and to verify the collateral-to-loan value for borrowers, so that we can notify borrowers when their position is at risk of liquidations, which are enforced based off the price reported by Chainlink. This makes Chainlink Price Feeds the source of truth on important decisions, such as those made on liquidations, which means we must ensure they are reliable and transparent at all times.

## API Exercise: Create Price API
Now let's checkout how we can create our very own custom price API, which gets the most up-to-date price directly from Chainlink Price Oracle contracts.

First, let's clone a local copy of the Workshop API using the provided link, then we will change the directory (cd) to access the API, followed by installing dependencies with yarn.

Now that we have the information we need, let's review some key details that enable use to construct the content we want to request from the blockchain.

First, we have our constants. These are variables that do not change are are specific to the blockchain network we are connecting to within the API. Constants include the oracle addresses, an RPC URL, chainId, and asset addresses.

Next, we have the core aspect of the api called our Router. The router designates the route or path taken to access the request we want to construct. So, if we want to get prices, for example, we would inform the router to go to the price API and get the prices (of all assets) when the URL path is something like: api.soulswap.finance/prices

Note that a router may also accept variables that are passed into it. Such as the price for a given asset. This price can be requested using a path like api.soulswap.finance/price/link, which will output only the price of LINK and not any other asset.

Finally, the magick happens in the APIs directory, which contains the logic for a given request. So, if you want to have an API for prices, as we use in our example, the price API shall contain the set of functions which help gather the response for a given request.



## API Exercise: Deploy Custom API URL
Now let's proceed with deploying a custom API URL. One tool I find incredibly valuable is called Vercel, which is a platform for deploying frontends that can even be tied to a custom URL and enables you to seamlessly import a repository from your GitHub.

Go ahead and create an account on Vercel (if you'd like) and follow along while I show you how easy it is to import a GitHub Repository and deploy your very own API in under a minute.

After we deploy, we can inspect the URL that is generated by Vercel.

Another neat aspect of Vercel that is worthy of consideration is the ability to not only view the most recent deployment you made, but all historical deployments -- each with their own URL. This means you can review historical deployments and easily roll back to previous versions, if necessary.

## Using Oracles: Concluding Remarks

As you can see, there is so much you can do once you know how to access Chainlink Oracles and construct custom calls to on-chain contracts which can be accessed on your frontend or used by bots you create.

Your community will benefit from speedy results as the UI will only have to use the URL to discover on-chain data, which means you can unlock the ability to access information that would've otherwise required RPC calls each time. This performance optimization will be appreciated by your community and you won't have to rely on anyone having to connect with their wallet to tap into DeFi magick.

## Best Practices

In this section, we will cover two distinct aspects of deploying a workflow that will enable you to ensure only the most up-to-date prices are references both on your frontend and backend. 

This is especially critical when markets are fluctuating drastically and even more so with the advent of Flash Loans, where now anyone can tap into unlimited resources. 

## Why Refresh Prices

Why do we refresh prices? We do this because smart contracts lack the ability to refresh themselves. This leads to the potential of vulnerabilities arising from stale price oracles, so we much be on top of ensuring our community's assets are protected by automating price refreshes.

## Security Exercise: Serverless Automation
For our final exercise, let's dive into serverless automation. Keep in mind that you may not be able to use this tool quite yet, but fortunately I wrote up an article that breaks down how to setup your very own serverless environment. 

Serverless tooling enables you to tap into automation in addition to sending notifications directly to you via Slack, for example, or Discord.

Now, let's dive into this Automation Exercise that you can take with you and use for Lending Markets and whatever else your heart so desires.